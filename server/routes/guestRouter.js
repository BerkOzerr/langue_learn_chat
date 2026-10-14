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

const findGuest = async (guestName) => {
  // console.log(guestName);
  const result = await pool.query(
    `SELECT  guest_name
   FROM guests.guests
   WHERE guest_name = $1`,
    [guestName],
  );
  return result;
};

const createGuest = async () => {
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
        message: `${guestName} Welcome`,
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
  const response = await createGuest();
  console.log(response);

  res.status(response.status).json(response);
});

router.post("/find", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        errorName: "Misafir adı gönderilmedi.",
      });
    }

    const result = await findGuest(name);

    // Misafir veritabanında bulunamadı
    if (result.rows.length === 0) {
      return res.status(404).json({
        errorName: `Misafir bulunamadı: ${name}`,
      });
    }

    // Misafir bulundu
    return res.status(200).json({
      status: 200,
      guestName: result.rows[0].guest_name,
      message: `${name}  doğrulandı.`,
    });
  } catch (error) {
    console.error("findGuest hatası:", error);

    return res.status(500).json({
      errorName: "Veritabanı kontrolü sırasında hata oluştu.",
    });
  }
});
router.get("/", (req, res) => {
  res.send("Berk");
});

module.exports = router;
