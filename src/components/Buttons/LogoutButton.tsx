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
      } else {
        toast.success("Logged out successfully.");
        replace("/");
        refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={logoutHandler}>
      <LogOutIcon />
      Logout
    </Button>
  );
};

export default LogoutButton;
