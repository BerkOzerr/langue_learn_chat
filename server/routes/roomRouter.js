const express = require("express");
const router = express.Router();
const pool = require("../database");

const createdAt = () => {
  const now = new Date();
  return now.toISOString();
};

router.post("/create", async (req, res) => {
  const createdTime = createdAt();
  const {
    roomName,
    roomDescription,
    roomLangue,
    roomLevel,
    roomMaxMembers,
    messages,
    insideRoomMembers,
  } = req.body;

  if (!roomName || !roomLangue || !roomLevel) {
    return res.status(400).json({
      message: "Oda adı, dili ve seviyesi zorunludur.",
    });
  }

  const maxMembers = Number(roomMaxMembers);

  if (!Number.isInteger(maxMembers) || maxMembers < 2 || maxMembers > 20) {
    return res.status(400).json({
      message: "Üye sayısı 2 ile 20 arasında olmalıdır.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO rooms.rooms (
        room_name,
        room_description,
        room_langue,
        room_level,
        room_max_members,
        messages,
        inside_room_members,
        created_at

      )
      VALUES ($1, $2, $3, $4, $5, $6::jsonb,$7::jsonb,$8)
      RETURNING *`,
      [
        roomName,
        roomDescription ?? "",
        roomLangue,
        roomLevel,
        maxMembers,
        JSON.stringify(Array.isArray(messages) ? messages : []),
        JSON.stringify(
          Array.isArray(insideRoomMembers) ? insideRoomMembers : [],
        ),
        createdTime,
      ],
    );

    return res.status(201).json({
      message: "Oda başarıyla oluşturuldu.",
      room: result.rows[0],
    });
  } catch (error) {
    console.error("Oda kaydetme hatası:", error);

    return res.status(500).json({
      message: "Oda veritabanına kaydedilemedi.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM rooms.rooms
      ORDER BY id DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Odaları getirme hatası:", error);

    res.status(500).json({
      message: "Odalar getirilemedi.",
    });
  }
});

router.post("/:roomId/join", async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "Kullanıcı ID zorunludur.",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE rooms.rooms
       SET inside_room_members =
         CASE
           WHEN NOT (inside_room_members @> $1::jsonb)
           THEN inside_room_members || $1::jsonb
           ELSE inside_room_members
         END
       WHERE id = $2
         AND jsonb_array_length(inside_room_members) < room_max_members
       RETURNING *`,
      [JSON.stringify([userId]), roomId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Oda bulunamadı veya oda dolu.",
      });
    }

    return res.status(200).json({
      message: "Odaya başarıyla katıldınız.",
      room: result.rows[0],
    });
  } catch (error) {
    console.error("Odaya katılma hatası:", error);

    return res.status(500).json({
      message: "Odaya katılınamadı.",
    });
  }
});

module.exports = router;
