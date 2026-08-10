import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Hero content */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="bg-muted text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
            <ShieldCheck className="size-4" />
            Secure Academic Management
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Academic Information,
            <span className="text-primary"> All in One Place.</span>
          </h1>

          <p className="text-muted-foreground m-6 mx-auto max-w-2xl text-base leading-7 md:text-lg">
            A secure and centralized platform for managing student and teacher
            records while giving authorized users simple access to their
            academic information.
          </p>

          <Link
            href="/auth/login"
            className="bg-primary rounded p-4">
            Login to Your Account{" "}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
