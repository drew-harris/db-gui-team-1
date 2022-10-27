import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Login from "../../pages/accounts/Login";

const LoginOrSignup = () => {
  return (
    <div className="flex gap-8 font-bold">
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export const MainLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <nav className="flex bg-slate-800 gap-4 p-3 px-5 justify-between border-b-2 border-orange-500 shadow-orange-400">
        <Link to={"/"}>
          <div className="font-bold">Movie Website</div>
        </Link>
        <div>{user ? user.username : <LoginOrSignup />}</div>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};
