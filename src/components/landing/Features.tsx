import { LockKeyhole, Settings, UserRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";

const features = [
  {
    icon: UserRound,
    title: "Personal Profiles",
    description:
      "Students and teachers can securely view their own academic and personal information.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Access",
    description:
      "Role-based authentication ensures that users can only access the information they are authorized to view.",
  },
  {
    icon: Settings,
    title: "Administrative Control",
    description:
      "Administrators can add, edit, delete and manage student and teacher records from one place.",
  },
];

const Features = () => {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-primary text-sm font-medium">FEATURES</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Everything you need
          </h2>

          <p className="text-muted-foreground mt-4">
            A simple system designed to keep academic information organized,
            secure and accessible.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="h-full">
                <CardHeader>
                  <div className="bg-primary/10 text-primary mb-3 flex size-10 items-center justify-center rounded-md">
                    <Icon className="size-5" />
                  </div>

                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm leading-6">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
