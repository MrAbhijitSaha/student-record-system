import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../Buttons/LogoutButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Mars Academy logo"
            width={50}
            height={50}
            className="block dark:hidden"
          />

          <Image
            src="/whitelogo.png"
            alt="Mars Academy logo"
            width={50}
            height={50}
            className="hidden dark:block"
          />
        </Link>

        <nav className="flex items-center gap-4">
          {session?.user && <LogoutButton />}

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
