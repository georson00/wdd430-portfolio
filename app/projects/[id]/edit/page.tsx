
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/lib/actions";
import { Suspense } from "react";



interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

async function EditProjectForm({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Project
      </h1>

      <form action={updateProjectWithId} className="space-y-5">
        <div>
          <label htmlFor="title" className="block font-medium">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            defaultValue={project.title}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            rows={4}
            defaultValue={project.description}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="technologies" className="block font-medium">
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            defaultValue={project.technologies.join(", ")}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="type" className="block font-medium">
            Project Type
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue={project.type}
            className="w-full rounded border p-2"
          >
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>

        <div>
          <label htmlFor="link" className="block font-medium">
            Project URL (optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

          <Link
            href="/projects"
            className="rounded border px-4 py-2"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}


export default function EditProjectPage({
  params,
}: EditProjectPageProps) {
  return (
    <Suspense fallback={<EditProjectSkeleton />}>
      <EditProjectForm params={params} />
    </Suspense>
  );
}

function EditProjectSkeleton() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="animate-pulse space-y-5">
        <div className="h-9 w-48 rounded bg-slate-200" />

        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="space-y-2">
            <div className="h-5 w-32 rounded bg-slate-200" />
            <div className="h-10 w-full rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </main>
  );
}

