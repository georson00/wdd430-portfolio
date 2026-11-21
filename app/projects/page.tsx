
import { Suspense } from "react";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { deleteProject } from "@/lib/actions";



interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

async function ProjectsContent({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const query =
    typeof params.query === "string"
      ? params.query.trim().slice(0, 100)
      : "";

  const requestedPage = Number(params.page ?? "1");

  const totalPages = await fetchProjectsPages(query);

  const parsedPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const currentPage =
    totalPages > 0
      ? Math.min(parsedPage, totalPages)
      : 1;

  const projects = await fetchFilteredProjects(query, currentPage);

  return (
    <>
      <ProjectSearch />

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          
{projects.map((project) => {
  const deleteProjectWithId = deleteProject.bind(null, project.id);

  return (
    <li key={project.id} className="rounded border p-4">
      <h2 className="font-semibold">
        {project.title}
      </h2>

      <p className="mb-3">{project.description}</p>

      <div className="flex items-center gap-4">
        <Link
          href={`/projects/${project.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Edit Project
        </Link>

        <form action={deleteProjectWithId}>
          <button
            type="submit"
            className="text-red-600 hover:underline"
          >
            Delete Project
          </button>
        </form>
      </div>
    </li>
  );
})}

        </ul>
)}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
}

export default function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
  <h1 className="text-3xl font-bold">
    Projects Overview
  </h1>

  <Link
    href="/projects/create"
    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    + Create Project
  </Link>
</div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-full rounded bg-slate-200" />

      {[1, 2, 3].map((item) => (
        <div key={item} className="space-y-2">
          <div className="h-6 w-48 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
