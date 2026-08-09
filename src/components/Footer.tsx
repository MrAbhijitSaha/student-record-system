import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Student Management System</p>

          <p className="text-muted-foreground mt-1 text-sm">
            Secure. Simple. Centralized.
          </p>
        </div>

        <div className="text-muted-foreground flex items-center gap-5 text-sm">
          <Link
            href="/auth/login"
            className="hover:text-foreground transition-colors">
            Login
          </Link>

          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
