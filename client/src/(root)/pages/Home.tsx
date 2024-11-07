import { currentUser } from "@/api";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { username, isAuthenticated, isLoading, checkUserAuth } =
    useUserStore();

  useEffect(() => {
    checkUserAuth(currentUser);
  }, []);

  return isLoading ? (
    <div className="flex-grow border flex items-center justify-center">
      <img src="/icons/loader.svg" alt="" width={120} height={120} />
    </div>
  ) : (
    <section className="flex-grow py-5 px-3 flex items-center justify-center flex-col gap-3">
      <h1 className="font-black text-[4rem] max-md:text-[3rem] text-pretty text-center">
        {isAuthenticated ? (
          <div className="flex items-center max-sm:flex-col gap-2">
            Hi,
            <p className="flex items-center">
              {username}
              <img src="/icons/smiley.gif" width={45} height={45} />
            </p>
          </div>
        ) : (
          "Welcome"
        )}
      </h1>
      <p className="italic text-gray-500 font-medium text-xl text-center text-pretty">
        "This is a simple full-stack app for my deployment tutorial".
      </p>
      <div className={`${isAuthenticated && "hidden"} flex gap-3`}>
        <Link to="/login">
          <Button className="rounded-lg" variant="secondary">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="rounded-lg" variant="secondary">
            Register
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
