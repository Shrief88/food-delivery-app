import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "../assets/images/res-logo.png";

import { authSchema, TAuthSchema } from "../validators/signup";
import { createUser } from "@/api/auth";
import useCheckToken from "@/hooks/useCheckToken";


const Signup = () => {
  useCheckToken();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: TAuthSchema) => {
    if (data.passwordConfirm !== data.password) {
      toast("Passwords do not match", {
        action: {
          label: "Undo",
          onClick: () => {},
        },
      });
    }
    try {
      toast.loading("Sending email...", { duration: Infinity });
      const response = await createUser(data);
      if (response === 201) {
        toast.dismiss(); // dismiss the loading toast
        toast.success("Email has been sent, please check your inbox");
      }
    } catch (err) {
      toast.dismiss(); // dismiss the loading toast
      const error = err as AxiosError<unknown>;
      if ((error.response?.status as number) === 409) {
        toast.error("Email already exists", {
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
            <h1 className="text-2xl font-bold ">Create an account</h1>
            <NavLink
              className="text-blue-700 text-sm hover:underline"
              to={"/login"}
            >
              Already have an account? Sign in here
            </NavLink>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-2 py-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.name,
                    })}
                    placeholder="Sherif Essam"
                    id="name"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500 font-Istok">
                      {errors.name.message}
                    </span>
                  )}
                </div>

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

                <div className="flex flex-col items-start gap-2 py-2">
                  <Label htmlFor="passwordConfirm">Password Confirm</Label>
                  <Input
                    {...register("passwordConfirm")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.passwordConfirm,
                    })}
                    id="passwordConfirm"
                    type="password"
                  />
                  {errors.passwordConfirm && (
                    <span className="text-sm text-red-500 font-Istok">
                      {errors.passwordConfirm.message}
                    </span>
                  )}
                </div>

                <Button className="mt-4">Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
