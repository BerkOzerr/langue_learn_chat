import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateThema } from "../redux/slice/themaSlice";

const Header = () => {
  const { thema } = useSelector((state) => state.thema);
  const dispatch = useDispatch();
  console.log(thema);

  return (
    <div className="bg-black/70 text-white flex items-center justify-center lg:justify-between gap-2 lg:gap-0 w-full truncate flex-wrap px-6 py-8 mb-2 ">
      <span className="text-2xl lg:text-4xl">Langue Learn Chat</span>
      <div className="flex items-center justify-center p-2 gap-2 ">
        <div className="flex items-center gap-2 justify-center">
          {thema === "dark" ? (
            <div
              onClick={() => dispatch(updateThema("light"))}
              className="p-3 rounded-[50%] shadow-md shadow-indigo-400 flex justify-center items-center"
            >
              <Moon
                stroke="var(--color-indigo-400)"
                className="hover:animate-pulse delay-200    duration-100 ease-in-out transition-all"
              />
            </div>
          ) : (
            <div
              onClick={() => dispatch(updateThema("dark"))}
              className="p-3 rounded-[50%] shadow-md cursor-pointer shadow-amber-400 flex justify-center items-center"
            >
              <Sun
                stroke="var(--color-amber-400)"
                className=" hover:animate-spin delay-200 duration-100 ease-in-out transition-all"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center text-[12px] lg:text-2xl font-medium gap-4 ">
        <Link
          className="shadow-md border-none hover:rounded-xl p-2 hover:bg-emerald-600 ease-in transition-all  delay-300 duration-200  "
          to={"/login"}
        >
          Sign In
        </Link>
        <Link
          className="shadow-md border-none hover:rounded-xl p-2 hover:bg-indigo-600  ease-out transition-all   delay-300 duration-200 "
          to={"/register"}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
