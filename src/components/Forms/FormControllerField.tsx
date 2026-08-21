"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Field, FieldError, FieldLabel } from "../shadcnui/field";

import { Input } from "../shadcnui/input";

type FormControllerFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
};

const FormControllerField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  className,
  autoComplete = "off",
  disabled = false,
  required = false,
}: FormControllerFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}

            {required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>

          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            required={required}
            aria-invalid={fieldState.invalid}
            className={cn("rounded", className)}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormControllerField;
