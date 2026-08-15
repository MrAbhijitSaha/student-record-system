"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/shadcnui/button";
import { AddTeacherAndStudentFormValues } from "@/lib/type";
import { addTeacherAndStudentSchema } from "@/lib/zodSchema";
import { createTeacherOrStudent } from "@/server/person";

import PhotoField from "../PhotoField";
import StatusField from "../StatusField";
import ControllerRole from "./ControllerRole";
import FormControllerField from "./FormControllerField";
import FormControllerTextarea from "./FormControllerTextarea";

type Props = {
  defaultValues?: Partial<AddTeacherAndStudentFormValues>;
  submitLabel?: string;
};

type SectionHeaderProps = {
  title: string;
  description: string;
};

const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-muted-foreground mt-1 text-sm">{description}</p>
  </div>
);

const createFormData = (values: AddTeacherAndStudentFormValues) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value instanceof File) {
      if (value.size > 0) {
        formData.append(key, value);
      }
      return;
    }

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

const AddTeacherAndStudentForm = ({
  defaultValues,
  submitLabel = "Add Person",
}: Props) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AddTeacherAndStudentFormValues>({
    resolver: zodResolver(addTeacherAndStudentSchema),
    defaultValues: {
      role: "student",
      idNumber: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      gender: "male",
      admissionDate: "",
      course: "",
      status: "active",
      totalFees: "",
      password: "",
      photo: undefined,
      ...defaultValues,
    },
    mode: "all",
  });

  const role = useWatch({ control, name: "role" });
  const isStudent = role === "student";

  const handleFormSubmit = async (values: AddTeacherAndStudentFormValues) => {
    const formData = createFormData(values);
    const result = await createTeacherOrStudent(formData);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
    router.push("/admin/students");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-8"
      noValidate>
      <section className="space-y-5">
        <SectionHeader
          title="Basic Information"
          description="Enter the basic information of the student or teacher."
        />

        <ControllerRole control={control} />

        <div className="grid gap-5 md:grid-cols-2">
          <FormControllerField
            control={control}
            name="idNumber"
            label={isStudent ? "Student ID" : "Teacher ID"}
            placeholder={isStudent ? "Enter student ID" : "Enter teacher ID"}
            autoComplete="off"
            required
          />

          <FormControllerField
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="Enter full name"
            autoComplete="name"
            required
          />

          <FormControllerField
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            required
          />

          <FormControllerField
            control={control}
            name="phone"
            label="Phone"
            type="tel"
            placeholder="Enter phone number"
            autoComplete="tel"
            required
          />

          <FormControllerField
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            required
          />

          <FormControllerField
            control={control}
            name="admissionDate"
            label={isStudent ? "Admission Date" : "Joining Date"}
            type="date"
            required
          />
        </div>

        <FormControllerTextarea
          control={control}
          name="address"
          label="Address"
          placeholder="Enter complete address"
        />
      </section>

      <section className="space-y-5 border-t pt-8">
        <SectionHeader
          title={
            isStudent ? "Academic Information" : "Professional Information"
          }
          description="Add department and course information."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormControllerField
            control={control}
            name="course"
            label={isStudent ? "Course" : "Department"}
            placeholder="B.Sc Computer Science"
            required
          />
        </div>
      </section>

      {isStudent && (
        <section className="space-y-5 border-t pt-8">
          <SectionHeader
            title="Fee Information"
            description="Enter the student's fee information."
          />
          <FormControllerField
            control={control}
            name="totalFees"
            label="Total Fees"
            placeholder="55"
            required
          />
        </section>
      )}

      <section className="space-y-5 border-t pt-8">
        <SectionHeader
          title="Account Information"
          description="Create the initial password for this account."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative">
            <FormControllerField
              control={control}
              name="password"
              label="Initial Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter initial password"
              autoComplete="new-password"
              required
            />

            <Button
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              className="text-foreground absolute top-8 right-3 bg-transparent p-0 hover:bg-transparent">
              {showPassword ?
                <EyeClosedIcon />
              : <EyeIcon />}
            </Button>
          </div>

          <StatusField control={control} />
        </div>
      </section>

      <section className="space-y-5 border-t pt-8">
        <SectionHeader
          title="Profile Photo"
          description="Upload a profile photo if available."
        />

        <PhotoField control={control} />
      </section>

      <div className="flex justify-end border-t pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded">
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default AddTeacherAndStudentForm;
