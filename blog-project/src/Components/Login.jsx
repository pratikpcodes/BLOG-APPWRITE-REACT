import React from "react";
import { login as reduxLogin } from "../Redux/auhslice";
import useForm from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import Input from "./Input";
import Button from "./Buttons";
import Logo from "./Logo";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const loginSubmit = async (data) => {
    setError("");
    try {
      const session = await authService.loginAcc(data);
      if (session) {
        const userData = await authService.getCurrUser();
        if (userData) dispatch(reduxLogin(userData));
        navigate("/");
      }
    } catch (error) {
      console.log("LOGIN:: JSX ::SUBMIT::::");
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg  border-black/10 bg-gray-100 rounded-xl p-8 border`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don &apos; t have any account? &nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(loginSubmit)} className="mt-8">
          <div className="space-y-5"></div>
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (val) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
                  "Email address must be a valid address",
              },
            })}
            //register value is spread
          />

          <Input
            label="Password"
            placeholder="Enter your Password"
            type="pass"
            {...register("pass", {
              required: true,
              validate: {
                matchPatern: (val) =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    val
                  ) || "Password must be a valid",
              },
            })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
