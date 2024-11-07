import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useUserStore from "@/store/userStore";
import { currentUser, logout } from "@/api";
import { useState } from "react";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, checkUserAuth } = useUserStore();

  const [isLoggingOutLoading, setIsLoggingOutLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOutLoading(true);
    try {
      const logoutUser = await logout();

      toast.success(logoutUser.message);

      await checkUserAuth(currentUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOutLoading(false);
    }
  };
  return (
    <header className="p-5 shadow">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="rounded-full">
            Logo
          </Button>
        </Link>
        <div className={`${!isAuthenticated && "hidden"}`}>
          <Button
            type="button"
            disabled={isLoggingOutLoading}
            className="rounded-lg"
            onClick={handleLogout}
          >
            {isLoggingOutLoading ? "Loading..." : "Logout"}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
