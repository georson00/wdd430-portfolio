import type { Project } from "@/lib/projects-db";

export default async function openSourceProjects() { 

    const response = await fetch(
        "http://localhost:3000/api/projects?type=opensource", 
        {cache: "no-store"});
 if (!response.ok){
        throw new Error("Failed to fetch projects");
    }

    const projects: Project[] = await response.json();

    return(
        <main className="p-6">
            <h1 className="mb-4 text-3xl font-bold">Open Source Projects</h1>
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
        </main>
    );

}
