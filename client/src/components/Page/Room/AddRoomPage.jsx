import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { createRoom } from "../../../redux/slice/roomSlice";
import { useNavigate } from "react-router-dom";

const AddRoomPage = ({ activeAddRoom, setActiveAddRoom }) => {
  const [addRoomName, setaddRoomName] = useState("");
  const [addRoomDescription, setaddRoomDescription] = useState("");
  const [addRoomLangue, setaddRoomLangue] = useState("English");
  const [addRoomLevel, setaddRoomLevel] = useState("Beginning");
  const [addRoomMaxMembers, setaddRoomMaxMembers] = useState(2);
  // const socket = io(import.meta.env.VITE_SERVER_BASE_URL);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addRoom = () => {
    const room = {
      roomName: addRoomName,
      roomDescription: addRoomDescription,
      roomLangue: addRoomLangue,
      roomLevel: addRoomLevel,
      roomMaxMembers: addRoomMaxMembers,
      messages: [],
      insideRoomMembers: [],
    };
    // console.log(room);
    dispatch(createRoom(room));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addRoom();
        navigate("/rooms");
      }}
      className="flex flex-col justify-start p-8 gap-3 items-start w-3/4 rounded-xl h-120 absolute z-99 bg-black/40 text-white"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-2xl font-bold mb-4">Add your group</span>
        <div
          onClick={() => {
            setActiveAddRoom(!activeAddRoom);
          }}
          className="p-2 rounded-full items-center flex justify-center bg-white cursor-pointer opacity-40 hover:opacity-90 "
        >
          <X className="stroke-red-600 " />
        </div>
      </div>
      <div className=" flex items-center justify-center w-3/4 ">
        <label className="w-1/6" htmlFor="room_Name">
          Group Name
        </label>
        <input
          onChange={(e) => setaddRoomName(e.target.value)}
          type="text"
          required
          placeholder="Enter your Grup name"
          className="outline-none placeholder:text-xs placeholder:overflow-clip rounded-b-none rounded-3xl shadow-md shadow-indigo-600 bg-black/50 text-white/80 p-3 w-2/3"
        />
      </div>
      <div className=" flex items-center justify-center w-3/4 ">
        <label className="w-1/6" htmlFor="room_Description">
          Group Description
        </label>
        <input
          onChange={(e) => setaddRoomDescription(e.target.value)}
          type="text"
          placeholder="İngilizce öğreniyorum, konuşacak arkadaşlar arıyorum."
          className="outline-none placeholder:text-xs placeholder:overflow-clip rounded-b-none rounded-3xl shadow-md shadow-indigo-600 bg-black/50 text-white/80 p-3 w-2/3"
        />
      </div>
      <div className=" flex items-center justify-center w-3/4 ">
        <label className="w-1/6" htmlFor="room_Language">
          Group Language
        </label>
        <input
          onChange={(e) => setaddRoomLangue(e.target.value)}
          type="text"
          required
          value={addRoomLangue}
          placeholder="English..."
          className="outline-none placeholder:text-xs placeholder:overflow-clip  rounded-b-none rounded-3xl shadow-md shadow-indigo-600 bg-black/50 text-white/80 p-3 w-2/3"
        />
      </div>
      <div className=" flex items-center justify-center w-3/4 ">
        <label className="w-1/6" htmlFor="room_Level">
          Group Level
        </label>
        <input
          onChange={(e) => setaddRoomLevel(e.target.value)}
          required
          value={addRoomLevel}
          type="text"
          placeholder="Beginning,Intermediate level..."
          className="outline-none placeholder:text-xs placeholder:overflow-clip rounded-b-none rounded-3xl shadow-md shadow-indigo-600 bg-black/50 text-white/80 p-3 w-2/3"
        />
      </div>
      <div className=" flex items-center justify-center w-3/4 ">
        <label className="w-1/6" htmlFor="room_Max_Members">
          Group Max Members
        </label>
        <input
          onChange={(e) => setaddRoomMaxMembers(Number(e.target.value))}
          type="number"
          required
          value={addRoomMaxMembers}
          min={2}
          max={20}
          placeholder="1"
          className="outline-none placeholder:text-xs placeholder:overflow-clip rounded-b-none rounded-3xl shadow-md shadow-indigo-600 bg-black/50 text-white/80 p-3 w-2/3"
        />
      </div>
      <div className=" flex items-center justify-center w-3/4 ">
        <label className="w-1/6" htmlFor="room_Max_Members"></label>
        <button
          type="submit"
          className="outline-none opacity-40 hover:opacity-90  rounded-3xl shadow-xs shadow-indigo-600 bg-black/50 text-white/80 p-3 w-2/3"
        >
          Create your Groups
        </button>
      </div>
    </form>
  );
};

export default AddRoomPage;
