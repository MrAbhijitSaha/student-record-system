"use client";

import { Button } from "@/components/shadcnui/button";
import { Field, FieldError, FieldLabel } from "@/components/shadcnui/field";
import { AddTeacherAndStudentFormValues } from "@/lib/type";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";

type PhotoFieldProps = {
  control: Control<AddTeacherAndStudentFormValues>;
};

const PhotoField = ({ control }: PhotoFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <Controller
      name="photo"
      control={control}
      render={({ field, fieldState }) => {
        const selectedFile = field.value as File | undefined;

        const handleFileChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const file = event.target.files?.[0];

          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }

          const nextPreviewUrl = file ? URL.createObjectURL(file) : null;
          setPreviewUrl(nextPreviewUrl);
          field.onChange(file ?? undefined);
        };

        const handleRemove = () => {
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
          }

          field.onChange(undefined);
          const input = document.getElementById(
            "profile-photo-input",
          ) as HTMLInputElement | null;
          if (input) {
            input.value = "";
          }
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Profile Photo</FieldLabel>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input
                id="profile-photo-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="profile-photo-input"
                className="border-muted-foreground/25 hover:bg-muted relative flex size-32 cursor-pointer items-center justify-center overflow-hidden rounded border border-dashed text-center">
                {previewUrl ?
                  <Image
                    src={previewUrl}
                    alt="Selected profile preview"
                    className="size-full object-cover"
                    fill
                  />
                : <div className="text-muted-foreground flex flex-col items-center gap-2 px-2">
                    <Camera className="size-6" />
                    <span className="text-xs">Choose photo</span>
                  </div>
                }
              </label>

              {selectedFile && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemove}
                  className="rounded">
                  <X className="size-4" />
                  Remove
                </Button>
              )}
            </div>

            <p className="text-muted-foreground text-xs">
              JPEG, PNG or WebP. Maximum 5MB.
            </p>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default PhotoField;
