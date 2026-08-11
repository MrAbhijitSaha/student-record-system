"use client";

import toast from "react-hot-toast";
import { Button } from "../shadcnui/button";

const ToastButton = () => {
  return (
    <Button
      onClick={() => toast.success("Hello there 👋🏻")}
      size={"lg"}>
      Click Me!
    </Button>
  );
};

export default ToastButton;
