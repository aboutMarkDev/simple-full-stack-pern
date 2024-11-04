import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [isPassShow, setIsPassShow] = useState(false);
  const [isCPassShow, setIsCPassShow] = useState(false);
  return (
    <section className="flex-grow py-5 px-3 flex items-center justify-center flex-col gap-5 text-sm">
      <h1 className="text-center font-bold text-3xl">Registration</h1>
      <form className="w-full max-w-[18rem] space-y-3">
        <article className="space-y-1">
          <h3>Username</h3>
          <input type="text" className="h-10 rounded-lg px-3 border w-full" />
        </article>
        <article className="space-y-1">
          <div className="flex items-center justify-between">
            <label>Password</label>
            <button type="button" onClick={() => setIsPassShow(!isPassShow)}>
              {isPassShow ? "Hide" : "Show"} Password
            </button>
          </div>
          <input
            type={isPassShow ? "text" : "password"}
            className="h-10 rounded-lg px-3 border w-full"
          />
        </article>
        <article className="space-y-1">
          <div className="flex items-center justify-between">
            <label>Confirm Password</label>
            <button type="button" onClick={() => setIsCPassShow(!isCPassShow)}>
              {isCPassShow ? "Hide" : "Show"} Password
            </button>
          </div>
          <input
            type={isCPassShow ? "text" : "password"}
            className="h-10 rounded-lg px-3 border w-full"
          />
        </article>
        <Button type="submit" className="w-full">
          Submit
        </Button>

        <footer className="flex items-center justify-between">
          Already have an account?
          <Link to="/login">
            <Button size="sm" variant="link">
              Login here
            </Button>
          </Link>
        </footer>
      </form>
    </section>
  );
};

export default Register;
