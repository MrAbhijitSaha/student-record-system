import AddTeacherAndStudentForm from "@/components/Forms/AddTeacherAndStudentForm";

const AddStudentPage = () => {
  return (
    <div className="mx-auto mb-8 w-full max-w-5xl px-4 pt-24">
      <h1 className="text-2xl font-semibold">Add Student</h1>

      <p className="text-muted-foreground mt-1 text-sm">
        Create a new student account and profile.
      </p>

      <AddTeacherAndStudentForm submitLabel="Add Student" />
    </div>
  );
};

export default AddStudentPage;
