import "./App.css";
import { useSelector } from "react-redux";
import FirstPage from "./components/Page/FirstPage";
import RoomPage from "./components/Page/Room/RoomPage";

function App() {
  const guest = useSelector((state) => state.guest);
  const room = useSelector((state) => state.room);

  return <>{guest.isGuest ? <RoomPage /> : <FirstPage />}</>;
}

export default App;
