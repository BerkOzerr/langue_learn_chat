import { useEffect, useState } from "react";
import Room from "./Room";
import { MessageCircle, Plus } from "lucide-react";
import AddRoomPage from "./AddRoomPage";
import { useDispatch, useSelector } from "react-redux";
import { getRoomList } from "../../../redux/slice/roomSlice";
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
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomList());
  }, [dispatch]);

  const [activeId, setActiveId] = useState(null);
  const [activeAddRoom, setActiveAddRoom] = useState(false);
  const active = room.rooms?.find((r) => r.id === activeId);
  return (
    <div className="flex items-center relative  justify-center flex-col gap-4 p-4 w-full h-fit">
      <div className="flex flex-col w-full p-4">
        <h1 className=" font-bold text-3xl text-indigo-400">
          Benimle Dil Öğren
        </h1>
        <p className="sub">Bir grup seç, yazmaya başla.</p>
      </div>
      {room.rooms?.length >= 1 ? (
        <aside className={"sidebar" + (active ? " hidden-mobile" : "")}>
          <ul className="room-list">
            {room.rooms?.map((r) => (
              <Room
                key={r.id}
                outRoom={r}
                selected={r.id === activeId}
                onClick={() => setActiveId(r.id)}
              />
            ))}
          </ul>
        </aside>
      ) : (
        <></>
      )}

      <div className="flex font-bold  w-full p-4 justify-end  text-indigo-400 ">
        <div
          onClick={() => setActiveAddRoom(!activeAddRoom)}
          className="flex relative p-2 rounded-full shadow-md shadow-black cursor-pointer"
        >
          <MessageCircle className="absolute" />
          <Plus />
        </div>
      </div>
      {activeAddRoom ? (
        <AddRoomPage
          activeAddRoom={activeAddRoom}
          setActiveAddRoom={setActiveAddRoom}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomList;
