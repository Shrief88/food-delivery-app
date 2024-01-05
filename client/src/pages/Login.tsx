import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import logo from "../assets/images/res-logo.png";
import { loginSchema, TLoginSchema } from "../validators/login";
import { login } from "@/api/auth";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/stateStore";
import { authStateServices } from "@/reducers/authStateSlice";
import useCheckToken from "@/hooks/useCheckToken";


const Login = () => {
  useCheckToken();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const response = await login(data);
      dispatch(authStateServices.actions.setAuthState(response));
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as AxiosError<unknown>;
      if ((error.response?.status as number) === 404) {
        toast.error("Invalid Credintails", {
          action: {
            label: "Undo",
            onClick: () => {},
          },
        });
      } else if ((error.response?.status as number) === 401) {
        toast.error("Email has not been verified", {
          action: {
            label: "Undo",
            onClick: () => {},
          },
        });
      } else {
        toast.error("Something went wrong, please try again", {
          action: {
            label: "Undo",
            onClick: () => {},
          },
        });
      }
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
          <div className="flex flex-col items-center text-center space-y-4">
            <img src={logo} className="h-20 w-20" />
            <h1 className="text-2xl font-bold ">Log in to your account</h1>
          </div>
          <div className="grid gap-6 mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-2 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                    id="email"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500 font-Istok">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    id="password"
                    type="password"
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500 font-Istok">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <Button className="mt-4">Log in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
