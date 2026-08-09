import { UserIcon } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Link
      href="/student/profile"
      className="border-input bg-background text-foreground hover:bg-muted inline-flex items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium transition-colors">
      <UserIcon className="size-4" />
      Profile
    </Link>
  );
};

export default ProfileButton;
