import { useSelector } from "react-redux";
import Header from "../../Header";
import RoomList from "./RoomList";
import Room from "./Room";

const RoomPage = () => {
  const guest = useSelector((state) => state.guest);
  return (
    <div>
      <Header />
      <RoomList />
    </div>
  );
};

export default RoomPage;
