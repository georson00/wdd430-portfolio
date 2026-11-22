
import CreateProjectForm from "./create-project-form";

export default function CreateProjectPage() {
  const currentYear = 2026;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create New Project
      </h1>

      <CreateProjectForm currentYear={currentYear} />
    </main>
  );
}
