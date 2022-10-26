import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const MainLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <nav className="flex bg-slate-800 gap-4 p-3 justify-between border-b-2 border-orange-500 shadow-orange-400">
        <Link to={"/"}>
          <div className="font-bold">Movie Website</div>
        </Link>
        <div>{user ? user.username : <Link to="/login">Login</Link>}</div>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};
