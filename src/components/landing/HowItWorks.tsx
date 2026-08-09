import { ArrowRight, KeyRound, LayoutDashboard, UserRound } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: KeyRound,
    title: "Login",
    description: "Sign in using your assigned username and password.",
  },
  {
    number: "02",
    icon: UserRound,
    title: "Access Your Profile",
    description:
      "Students and teachers can view their own profile information.",
  },
  {
    number: "03",
    icon: LayoutDashboard,
    title: "Manage Records",
    description:
      "Administrators can manage student and teacher information from the dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-primary text-sm font-medium">HOW IT WORKS</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Simple from start to finish
          </h2>

          <p className="text-muted-foreground mt-4">
            Access the system in just a few simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.number}
                className="relative">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {step.number}
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="text-primary size-5" />

                      <h3 className="font-semibold">{step.title}</h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-6">
                      {step.description}
                    </p>
                  </div>
                </div>

                {!isLast && (
                  <ArrowRight className="text-muted-foreground absolute top-2 -right-4 hidden size-5 md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
