import { Suspense } from "react";
import { getProjects } from "@/lib/projects-db";


async function SchoolProjectList() { 

    const projects = await getProjects("school");

    return(

            <ul className="space-y-4">
                {projects.map((project) =>(
                    <li key={project.id}>
                        <h2 className="font-semibold">
                            {project.title}
                        </h2>
                        <p>{project.description}</p>

                    </li>
                ))}
            </ul>
        
    );

}
// Loading skeleton component
function SchoolProjectsSkeleton() {
    return (
        <ul className="animate-pulse space-y-4" aria-label="Loading school projects">
            {[1, 2, 3].map((item) => (
                <li key={item} className="space-y-2">
                    <div className="h-6 w-48 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                </li>
            ))}
        </ul>
    );
}

// Page component
export default function SchoolProjectsPage() {
    return (
        <main className="p-6">
            <h1 className="mb-4 text-3xl font-bold">
                School Projects
            </h1>

            <Suspense fallback={<SchoolProjectsSkeleton />}>
                <SchoolProjectList />
            </Suspense>
        </main>
    );
}