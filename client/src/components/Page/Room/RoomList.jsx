import { useState } from "react";
import Room from "./Room";
const INITIAL_ROOMS = [
  {
    id: "r1",
    name: "English Coffee Corner",
    description: "İngilizce öğreniyorum, konuşacak arkadaşlar arıyorum.",
    language: "İngilizce",
    level: "Başlangıç",
    maxMembers: 10,
    members: ["Elif", "Mark", "Ahmet", "Sofia"],
    messages: [
      {
        id: 1,
        author: "Mark",
        text: "Hi everyone! What did you do today?",
        time: "10:02",
      },
      {
        id: 2,
        author: "Elif",
        text: "I went to the market. Bugün pazara gittim.",
        time: "10:04",
      },
      {
        id: 3,
        author: "Mark",
        text: "Nice! 'I went' is correct, well done.",
        time: "10:05",
      },
    ],
  },
  {
    id: "r2",
    name: "Türkçe öğretiyorum",
    description: "Teaching Turkish. Ask me anything!",
    language: "Türkçe",
    level: "Her seviye",
    maxMembers: 5,
    members: ["Ahmet", "Sofia", "John"],
    messages: [
      {
        id: 1,
        author: "Ahmet",
        text: "Merhaba! Bugünün kelimesi: 'kitap'.",
        time: "09:30",
      },
      {
        id: 2,
        author: "John",
        text: "Kitap means book, right?",
        time: "09:31",
      },
    ],
  },
  {
    id: "r3",
    name: "Almanca ikili pratik",
    description: "Sadece 2 kişi, günlük konuşma pratiği.",
    language: "Almanca",
    level: "Orta",
    maxMembers: 2,
    members: ["Lena"],
    messages: [],
  },
];

const RoomList = () => {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activeId, setActiveId] = useState(null);
  const active = rooms.find((r) => r.id === activeId);
  return (
    <div>
      <aside className={"sidebar" + (active ? " hidden-mobile" : "")}>
        <h1>Benimle Dil Öğren</h1>
        <p className="sub">Bir grup seç, yazmaya başla.</p>
        <ul className="room-list">
          {rooms.map((r) => (
            <Room
              key={r.id}
              room={r}
              selected={r.id === activeId}
              onClick={() => setActiveId(r.id)}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default RoomList;
