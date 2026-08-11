import { LockKeyholeIcon } from "lucide-react";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href="/auth/login"
      className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors">
      <LockKeyholeIcon className="size-4" />
      Login
    </Link>
  );
};

export default LoginButton;
