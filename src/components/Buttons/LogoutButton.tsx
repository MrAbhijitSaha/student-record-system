"use client";

import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "../shadcnui/button";

const LogoutButton = () => {
  const { replace, refresh } = useRouter();

  const logoutHandler = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error(error);
        toast.error("Failed to log out. Please try again.");
        return;
      }

      toast.success("Logged out successfully.");

      replace("/");
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className="rounded"
      onClick={logoutHandler}>
      <LogOutIcon className="size-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
