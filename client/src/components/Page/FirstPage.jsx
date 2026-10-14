import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { guestUserPost } from "../../redux/slice/guestSlice";
import { useDispatch } from "react-redux";

const FirstPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGuestLogin = async () => {
    try {
      await dispatch(guestUserPost()).unwrap();
      navigate("/rooms");
    } catch (error) {
      console.error("Misafir oluşturulamadı:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-1 items-center justify-center h-full ">
        <div className="w-fit rounded-2xl h-100 flex items-center flex-col justify-center p-8 bg-black/70 text-white  whitespace-normal wrap-break-word flex-wrap ">
          <div className="flex gap-2 justify-center items-center w-full transition-all delay-150 duration-300 hover:scale-110">
            <span>Zaten Hesabiniz varsa</span>
            <Link
              className="text-indigo-400 font-bold opacity-50 hover:opacity-85"
              to="/login"
            >
              Oturum aç
            </Link>
          </div>
          <div className="flex gap-2 justify-center items-center w-full transition-all delay-150 duration-300 hover:scale-110">
            <span>Hesabiniz yoksa</span>
            <Link
              className="text-indigo-400 font-bold opacity-50 hover:opacity-85"
              to="/register"
            >
              Kaydol
            </Link>
          </div>
          <div className="flex gap-2 justify-center items-center w-full transition-all delay-150 duration-300 hover:scale-110">
            <span>Misafir olarak devam etmek istiyorsaniz.</span>
            <Link
              onClick={handleGuestLogin}
              className="text-indigo-400 font-bold opacity-50 hover:opacity-85"
            >
              Misafir girişi
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
