
import Link from "next/link";
import { createProject } from "@/lib/actions";

export default function CreateProjectPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create New Project
      </h1>

      <form action={createProject} className="space-y-5">
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
            placeholder="Next.js, TypeScript, PostgreSQL"
            required
            className="w-full rounded border p-2"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate technologies with commas.
          </p>
        </div>

        <div>
          <label htmlFor="type" className="block font-medium">
            Project Type
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue=""
            className="w-full rounded border p-2"
          >
            <option value="" disabled>
              Select a project type
            </option>
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
            placeholder="https://github.com/..."
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Project
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
