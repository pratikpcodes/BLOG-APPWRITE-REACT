import React from "react";
import Input from "./Input";
import Button from "./Buttons";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { login as reduxLogin } from "../Redux/auhslice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
function Signup() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signupSubmit = async (data) => {
    seterror("");
    try {
      const session = await authService.createAcc(data);
      if (session) {
        const userData = await authService.getCurrUser();
        if (userData) dispatch(reduxLogin(userData));
        navigate("/");
      }
    } catch (error) {
      console.log("SIGNUP:: JSX ::ERROR", error.message);
      seterror(error.message);
    }
  };

  return     <div className="flex items-center justify-center">
  <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
  <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
          </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
      <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
          >
              Sign In
          </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form onSubmit={handleSubmit(signupSubmit)}>
          <div className='space-y-5'>
              <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                  required: true,
              })}
              />
              <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                  required: true,
                  validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
              })}
              />
              <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
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
                  Create Account
              </Button>
          </div>
      </form>
  </div>

</div>
}
export default Signup;
