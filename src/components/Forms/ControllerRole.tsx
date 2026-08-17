"use client";

import { GraduationCap, UserRound } from "lucide-react";

import { Control, Controller } from "react-hook-form";

import { AddTeacherAndStudentFormValues } from "@/lib/type";

import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import SelectRoleButton from "./SelectRoleButton";

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
            <SelectRoleButton
              value="student"
              currentValue={field.value}
              onChange={field.onChange}
              icon={GraduationCap}
              title="Student"
              description="Add a student profile"
            />

            <SelectRoleButton
              value="teacher"
              currentValue={field.value}
              onChange={field.onChange}
              icon={UserRound}
              title="Teacher"
              description="Add a teacher profile"
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ControllerRole;
