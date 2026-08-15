"use client";

import { GraduationCap, UserRound } from "lucide-react";

import { Control, Controller } from "react-hook-form";

import { AddTeacherAndStudentFormValues } from "@/lib/type";

import { Field, FieldError, FieldLabel } from "../shadcnui/field";

type Props = {
  control: Control<AddTeacherAndStudentFormValues>;
};

const ControllerRole = ({ control }: Props) => {
  return (
    <Controller
      name="role"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>Account Type</FieldLabel>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => field.onChange("student")}
              aria-pressed={field.value === "student"}
              className={[
                "rounded border p-4 text-left",
                "transition-colors",
                "hover:bg-muted",
                field.value === "student" ? "border-primary bg-primary/5" : "",
              ].join(" ")}>
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex size-10 items-center justify-center rounded",
                    field.value === "student" ?
                      "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                  ].join(" ")}>
                  <GraduationCap className="size-5" />
                </div>

                <div>
                  <p className="font-medium">Student</p>

                  <p className="text-muted-foreground text-sm">
                    Add a student profile
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => field.onChange("teacher")}
              aria-pressed={field.value === "teacher"}
              className={[
                "rounded border p-4 text-left",
                "transition-colors",
                "hover:bg-muted",
                field.value === "teacher" ? "border-primary bg-primary/5" : "",
              ].join(" ")}>
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex size-10 items-center justify-center rounded",
                    field.value === "teacher" ?
                      "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                  ].join(" ")}>
                  <UserRound className="size-5" />
                </div>

                <div>
                  <p className="font-medium">Teacher</p>

                  <p className="text-muted-foreground text-sm">
                    Add a teacher profile
                  </p>
                </div>
              </div>
            </button>
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ControllerRole;
