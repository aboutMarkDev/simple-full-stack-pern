import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUserStore from "@/store/userStore";
import { currentUser, login } from "@/api";
import toast from "react-hot-toast";
import { errorHandler } from "@/utils";

type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isAuthenticated, checkUserAuth } = useUserStore();

  const navigate = useNavigate();

  const [isPassShow, setIsPassShow] = useState(false);
  const [isLoggingLoading, setIsLoggingLoading] = useState(false);

  useEffect(() => {
    checkUserAuth(currentUser);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values: LoginFormData) => {
    setIsLoggingLoading(true);
    try {
      const loginUser = await login(values);

      toast.success(loginUser.message);

      await checkUserAuth(currentUser);

      reset();

      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(errorHandler(error.response.data.message));
    } finally {
      setIsLoggingLoading(false);
    }
  };

  return (
    <section className="flex-grow py-5 px-3 flex items-center justify-center flex-col gap-5 text-sm">
      <h1 className="text-center font-bold text-3xl">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[18rem] space-y-3"
      >
        <article className="space-y-1">
          <h3>Username</h3>
          <input
            type="text"
            className="h-10 rounded-lg px-3 border w-full"
            {...register("username", {
              required: "Required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters.",
              },
              maxLength: {
                value: 12,
                message: "Username must be at most 12 characters.",
              },
            })}
          />
          {errors?.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
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
            {...register("password", {
              required: "Required",
              minLength: {
                value: 4,
                message: "Passwords must be at least 4 characters",
              },
            })}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </article>
        <Button type="submit" className="w-full">
          {isLoggingLoading ? "Loading..." : "Login"}
        </Button>

        <footer className="flex items-center justify-between">
          Don't have an account?
          <Link to="/register">
            <Button size="sm" variant="link">
              Register here
            </Button>
          </Link>
        </footer>
      </form>
    </section>
  );
};

export default Login;
