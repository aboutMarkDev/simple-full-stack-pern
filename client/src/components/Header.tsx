import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="p-5 shadow">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="rounded-full">
            Logo
          </Button>
        </Link>
        <Button type="button" className="rounded-xl">
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Header;
