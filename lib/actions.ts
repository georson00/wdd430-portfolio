
"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProjectFormSchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(10),
  technologies: z.string().trim().min(2),
  type: z.enum(["school", "opensource"]),
  link: z.union([z.url(), z.literal("")]),
});


//-------------PROJECT CREATION-----------------------

export async function createProject(formData: FormData) {
  //Extract submitted form values
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    link: formData.get("link") ?? "",
  };

  //Validate the submitted data
  const parsed = ProjectFormSchema.safeParse(rawData);

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  //Extract validated values
  const { title, description, type, link } = parsed.data;

  //Convert technologies into an array
  const technologies = parsed.data.technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (technologies.length === 0) {
    throw new Error("At least one technology is required.");
  }

  //Insert the project into PostgreSQL
  
const technologiesValue = technologies.join(",");

await sql`
  INSERT INTO projects (
    title,
    description,
    type,
    technologies,
    link
  )
  VALUES (
    ${title},
    ${description},
    ${type},
    string_to_array(${technologiesValue}, ','),
    ${link || null}
  )
`;


  //Refresh the projects page
  revalidatePath("/projects");

  // Return to the projects list
  redirect("/projects");
}

//----------------- PROJECT UPDATE-------------

export async function updateProject(
    id: string,
    formData: FormData

){
    //Validate Proejct id
    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId) || projectId <= 0){
        throw new Error('Invalid project ID');
    }
    // Extract the form values
    const rawData ={
        title: formData.get('title'),
        description: formData.get("description"),
        technologies: formData.get("technologies"),
        type: formData.get("type"),
        link: formData.get("link") ?? "",

    };

    //validate the submitted values
    const parsed = ProjectFormSchema.safeParse(rawData);

    if (!parsed.success) {
        throw new Error("Invalid project input.");
    }

    const { title, description, type, link } = parsed.data;

    // Convert comma-seperated technologies into a PostgreSQL arra
    const technologies = parsed.data.technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

    if (technologies.length === 0){
        throw new Error("At least one technology is required.");
    }

    const technologiesValue = technologies.join(",");

    //Update the matching project
    const result = await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      type = ${type},
      technologies = string_to_array(${technologiesValue}, ','),
      link = ${link || null}
    WHERE id = ${projectId}
    RETURNING id
    `;

    if (result.rowCount === 0) {
        throw new Error("Project not found.");
    }

    revalidatePath("/projects");
    redirect("/projects");

}

//------------PROJECT DELETION---------------------


export async function deleteProject(id: number) {
  // Validate the project ID
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  // Delete the matching project
  const result = await sql`
    DELETE FROM projects
    WHERE id = ${id}
    RETURNING id
  `;

  if (result.rowCount === 0) {
    throw new Error("Project not found.");
  }

  // Refresh the projects list
  revalidatePath("/projects");
}
