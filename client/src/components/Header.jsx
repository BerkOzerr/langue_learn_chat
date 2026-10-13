import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-black/70 text-white flex items-center justify-center lg:justify-between gap-2 lg:gap-0 w-full truncate flex-wrap px-6 py-8 mb-2 ">
      <span className="text-2xl lg:text-4xl">Langue Learn Chat</span>
      <div className="flex items-center justify-center p-2 gap-2 ">
        <input
          className="rounded-2xl focus:text-red text-white/80 text-center px-4 py-2  shadow-md shadow-indigo-400 outline-none bg-transparent "
          placeholder="Search Lesson"
          type="text"
        />
        <div className="flex items-center gap-2 justify-center">
          <Moon className="stroke-indigo-400  shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-2xl shadow-indigo-400" />
          <Sun className="stroke-amber-400  shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-2xl shadow-amber-400 hover:animate-spin" />
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
