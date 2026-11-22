
"use client";

import { useActionState } from "react";
import { createProject, type State } from "@/lib/actions";
import Link from "next/link";

const initialState: State = {
  message: null,
  errors: {},
};

interface CreateProjectFormProps {
  currentYear: number;
}

export default function CreateProjectForm({
  currentYear,
}: CreateProjectFormProps) {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="title" className="block font-medium">
          Project Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={3}
          aria-invalid={Boolean(state.errors?.title?.length)}
          aria-describedby="title-error"
          className="w-full rounded border p-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          minLength={20}
          aria-invalid={Boolean(state.errors?.description?.length)}
          aria-describedby="description-error"
          className="w-full rounded border p-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="technologies" className="block font-medium">
          Technologies (comma-separated)
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          required
          placeholder="Next.js, TypeScript, PostgreSQL"
          aria-invalid={Boolean(state.errors?.technologies?.length)}
          aria-describedby="technologies-error"
          className="w-full rounded border p-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        />
        <div id="technologies-error" aria-live="polite" aria-atomic="true">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="yearCompleted" className="block font-medium">
          Year Completed
        </label>
        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min={2000}
          max={currentYear}
          required
          aria-invalid={Boolean(state.errors?.yearCompleted?.length)}
          aria-describedby="yearCompleted-error"
          className="w-full rounded border p-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        />
        <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
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
          aria-invalid={Boolean(state.errors?.type?.length)}
          aria-describedby="type-error"
          className="w-full rounded border p-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option value="school">School</option>
          <option value="opensource">Open Source</option>
        </select>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
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
          aria-invalid={Boolean(state.errors?.link?.length)}
          aria-describedby="link-error"
          className="w-full rounded border p-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        />
        <div id="link-error" aria-live="polite" aria-atomic="true">
          {state.errors?.link?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Project"}
        </button>

        <Link href="/projects" className="rounded border px-4 py-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}
