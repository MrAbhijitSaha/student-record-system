"use client";

import { Control, Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../shadcnui/field";

import { Textarea } from "../shadcnui/textarea";

import { AddTeacherAndStudentFormValues } from "@/lib/type";

type Props = {
  control: Control<AddTeacherAndStudentFormValues>;
  name: "address";
  label: string;
  placeholder?: string;
};

const FormControllerTextarea = ({
  control,
  name,
  label,
  placeholder,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <Textarea
            {...field}
            id={field.name}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            className="min-h-28 rounded"
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormControllerTextarea;
