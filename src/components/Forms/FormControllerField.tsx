import { LoginFormSchemaType } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Control, Controller, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

type FormControllerFieldProps = {
  control: Control<LoginFormSchemaType>;
  name: Path<LoginFormSchemaType>;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
};

const FormControllerField = ({
  control,
  name,
  label,
  type,
  placeholder,
  className,
  autoComplete,
}: FormControllerFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, field }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <Input
            {...field}
            id={field.name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={cn(`${className} rounded`)}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormControllerField;
