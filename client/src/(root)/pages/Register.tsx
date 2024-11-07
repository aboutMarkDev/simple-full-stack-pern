import { currentUser, registerUser } from "@/api";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import { errorHandler } from "@/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

type RegisterFormData = {
  username: string;
  password: string;
  cpassword: string;
};

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      password: "",
      cpassword: "",
    },
  });

  const { checkUserAuth, isAuthenticated } = useUserStore();

  const password = watch("password");

  const navigate = useNavigate();

  const [isPassShow, setIsPassShow] = useState(false);
  const [isCPassShow, setIsCPassShow] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  useEffect(() => {
    checkUserAuth(currentUser);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values: RegisterFormData) => {
    setIsRegisterLoading(true);
    try {
      const { username, password } = values;
      const newUser = await registerUser({ username, password });

      toast.success(newUser.message);

      await checkUserAuth(currentUser);

      reset();

      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(errorHandler(error.response.data.message));
    } finally {
      setIsRegisterLoading(false);
    }
  };
  return (
    <section className="flex-grow py-5 px-3 flex items-center justify-center flex-col gap-5 text-sm">
      <h1 className="text-center font-bold text-3xl">Registration</h1>

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
            {...register("cpassword", {
              required: "Required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors?.cpassword && (
            <p className="text-sm text-red-500">{errors.cpassword.message}</p>
          )}
        </article>
        <Button type="submit" disabled={isRegisterLoading} className="w-full">
          {isRegisterLoading ? "Loading..." : "Submit"}
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
