import { getProjects } from "@/lib/projects-db";

export default async function openSourceProjects() { 

    const projects = await getProjects("opensource");

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
