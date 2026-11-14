import { Suspense } from "react";
import type { Project } from "@/lib/projects-db";


/*const projects = [
  {
    title: 'HT Haiti Market – E-Commerce Web Application',
    description: 'A website where the Haitian diaspora can buy goods for their family members in Haiti.',
    technologies: ['HTML5', 'JavaScipt', 'CSS'],
    link: 'https://github.com/georson00/hthaitimarket'
  },
  {
    title: 'Service Network Web application',
    description: 'A web app that promotes service across the world by connecting volunteers with service opportunities in their community.',
    technologies: ['HTML','EJS','Node.js', 'JavaScript', 'CSS', 'PostgreSQL', 'Render'],
    link: 'https://github.com/georson00/georges-cse340'
  }
];
*/

async function ProjectsList() { 

    const response = await fetch("http://localhost:3000/api/projects",
        { cache: "no-store"}
    );
    
    if (!response.ok){
        throw new Error("Failed to fetch projects");
    }

    const projects= await response.json();

    return(
        <ul>
      {projects.map((project: { id: number; title: string }) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
    );

}

export default function ProjectsPage() {
    return(
        <main className="p-6">
            <h1 className="mb-4 text-3xl font-bold"> Projects Overview</h1>
            <Suspense fallback={<p>Loading projects...</p>}>
            <ProjectsList />
            </Suspense>
        
        </main>
    );

}



