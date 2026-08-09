"use client";

import { authClient } from "@/lib/auth-client";
import { LoginFormSchemaType } from "@/lib/type";
import { loginFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../shadcnui/dialog";
import FormControllerField from "./FormControllerField";

const isSafeRedirect = (dest: string): boolean =>
  dest.startsWith("/") && !dest.startsWith("//") && !dest.includes("://");

const LoginForm = ({ returnTo }: { returnTo?: string }) => {
  const { replace, refresh } = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: "",
      userName: "",
    },
    mode: "all",
  });

  const handleLoginFormSubmit = async ({
    password,
    userName,
  }: LoginFormSchemaType) => {
    try {
      const { error } = await authClient.signIn.username({
        username: userName,
        password,
      });

      if (error) {
        console.error(error);
        setError("password", {
          type: "server",
          message: "Invalid username or password.",
        });
        setError("userName", {
          type: "server",
        });
        return;
      }

      // Get the newly created session
      const { data: session, error: sessionError } =
        await authClient.getSession();

      if (sessionError || !session) {
        toast.error("Could not get your session.");
        return;
      }

      toast.success("Login successful!");

      reset();

      let destination: string;

      // Respect a safe returnTo URL if one exists
      if (returnTo && isSafeRedirect(returnTo)) {
        destination = returnTo;
      } else {
        switch (session.user.role) {
          case "admin":
            destination = "/admin/dashboard";
            break;

          case "student":
            destination = "/student/profile";
            break;

          case "teacher":
            destination = "/teacher/profile";
            break;

          default:
            toast.error("Your account does not have a valid role.");
            return;
        }
      }

      replace(destination as Route);
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLoginFormSubmit)}
      className="mt-5 space-y-4"
      noValidate>
      <FormControllerField
        control={control}
        name="userName"
        label="Student ID"
        placeholder="Enter your Student ID"
        type="text"
      />

      <div className="relative">
        <FormControllerField
          control={control}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
        />
        <Button
          onClick={() => setShowPassword(!showPassword)}
          className="text-foreground absolute top-8 right-3 bg-transparent p-0 hover:bg-transparent">
          {showPassword ?
            <EyeClosedIcon />
          : <EyeIcon />}
        </Button>
      </div>

      <div className="text-foreground flex justify-end">
        <Dialog>
          <DialogTrigger className="text-primary text-xs font-medium hover:underline">
            Forgot Password?
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogDescription>
                Sorry, you can not allow to reset your password. please contact
                with authority.
              </DialogDescription>
            </DialogHeader>
            <DialogClose className="text-primary bg-background p-2">
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-orange-500 py-5 font-semibold text-white uppercase hover:bg-orange-600">
        {isSubmitting ? "Logging in..." : "Secure Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
