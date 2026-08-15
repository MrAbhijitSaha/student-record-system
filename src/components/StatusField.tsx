"use client";

import { Control, Controller } from "react-hook-form";

import { AddTeacherAndStudentFormValues } from "@/lib/type";

import { Field, FieldError, FieldLabel } from "./shadcnui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcnui/select";

type Props = {
  control: Control<AddTeacherAndStudentFormValues>;
};

const StatusField = ({ control }: Props) => {
  return (
    <Controller
      name="status"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>Status</FieldLabel>

          <Select
            value={field.value}
            onValueChange={field.onChange}>
            <SelectTrigger
              className="w-full rounded"
              aria-invalid={fieldState.invalid}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default StatusField;
