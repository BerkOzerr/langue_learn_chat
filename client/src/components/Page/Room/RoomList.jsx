import { useEffect, useState } from "react";
import Room from "./Room";
import { MessageCircle, Plus } from "lucide-react";
import AddRoomPage from "./AddRoomPage";
import { useDispatch, useSelector } from "react-redux";
import { getRoomList } from "../../../redux/slice/roomSlice";

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
