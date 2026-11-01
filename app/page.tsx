import Image from "next/image";

import ProjectList from "@/components/ProjectList";

const projects = [
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

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}
