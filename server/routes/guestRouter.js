const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const pool = require("../database");

const creationGuest = () => {
  const guestName = `guest_${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const createdAt = now.toISOString();
  return { guestName: guestName, createdAt: createdAt };
};

const findOrCreateGuest = async () => {
  let attemps = 10;
  for (let attempt = 0; attempt < attemps; attempt++) {
    const { guestName, createdAt } = creationGuest();
    try {
      const result = await pool.query(
        `INSERT INTO guests.guests (guest_name)
         VALUES ($1)
         RETURNING *`,
        [guestName],
      );

      return {
        status: 200,
        guestName: guestName,
      };
    } catch (error) {
      // guest_name benzersizlik hatasıysa tekrar dene
      if (
        error.code === "23505" &&
        error.constraint === "guests_guest_name_unique"
      ) {
        continue;
      }

      // Diğer veritabanı hatalarını gizleme
      throw error;
    }
  }

  return {
    errorName: "Benzersiz guest adı üretilemedi.",
    createdAt: new Date().toString(),
    status: 404,
  };
};

router.get("/create", async (req, res) => {
  const response = await findOrCreateGuest();
  console.log(response);

  res.status(response.status).json(response);
});
router.get("/", (req, res) => {
  res.send("Berk");
});

module.exports = router;
