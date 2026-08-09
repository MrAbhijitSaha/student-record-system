import LoginForm from "@/components/Forms/LoginForm";
import { Card, CardContent } from "@/components/shadcnui/card";

const page = async () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-evenly md:flex-row">
      <div className="w-full text-center md:w-[50%]">
        <h1 className="text-5xl">
          Welcome to{" "}
          <span className="text-primary font-semibold"> Mars Academy</span>
        </h1>
      </div>

      <div className="w-full max-w-xl space-y-2">
        <p className="text-2xl font-semibold">Login to Your Account</p>

        <Card className="bg-transparent backdrop-blur">
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
