
import { Suspense } from "react";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";

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
          {projects.map((project) => (
            <li key={project.id}>
              <h2 className="font-semibold">
                {project.title}
              </h2>
              <p>{project.description}</p>
            </li>
          ))}
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
      <h1 className="mb-4 text-3xl font-bold">
        Projects Overview
      </h1>

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
