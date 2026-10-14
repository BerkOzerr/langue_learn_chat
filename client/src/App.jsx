import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import FirstPage from "./components/Page/FirstPage";
import RoomPage from "./components/Page/Room/RoomPage";
import { useEffect } from "react";
import { findGuest } from "./redux/slice/guestSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateThema } from "./redux/slice/themaSlice";

function App() {
  const guest = useSelector((state) => state.guest);
  const room = useSelector((state) => state.room);
  const { thema } = useSelector((state) => state.thema);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(thema);
    if (thema) {
      dispatch(updateThema(thema));
      document.documentElement.classList.toggle("dark", thema === "dark");
    }
  }, [thema, dispatch]);

  useEffect(() => {
    const savedGuestName = localStorage.getItem("guestName");

    if (savedGuestName) {
      dispatch(findGuest(savedGuestName));
      navigate("/rooms");
      return;
    }

    navigate("/");
  }, [dispatch]);

  return (
    <>
      <div className="app dark:bg-black/80 text-gray-700 flex-col  dark:text-white">
        <FirstPage />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
