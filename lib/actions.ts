
"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";


export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    type?: string[];
    link?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};


const ProjectFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters."),

  description: z.string().trim().min(
    20, 
    "Description must be at least 20 characters."
  ),

  technologies: z.string().trim().min(
    2,
    "Add at least one technology."
    ),

  type: z.enum(["school", "opensource"]),

  link: z.union([z.url(), z.literal("")]),


});

const CreateProjectSchema = ProjectFormSchema.extend({
  yearCompleted: z.coerce
    .number()
    .int("Year must be a whole number.")
    .gte(2000, "Year must be 2000 or later.")
    .lte(new Date().getFullYear(), "Year cannot be in the future."),
});

//-------------PROJECT CREATION-----------------------

export async function createProject(
    prevSate: State,
    formData: FormData
): Promise<State> {
 
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    link: formData.get("link") ?? "",
    yearCompleted: formData.get("yearCompleted"),
  };

  //Validate the submitted data
  const validatedFields = CreateProjectSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return{
        errors: validatedFields.error.flatten().fieldErrors,
        message:  "Missing or invalid fields. Failed to create project.",
    };
    
  }

  //Extract validated values
  const { 
    title, 
    description,
    technologies, 
    type, 
    link,
    yearCompleted
    } = validatedFields.data;


  //Convert technologies into an array
  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (technologiesArray.length === 0) {
    return{
        errors: {
            technologies: ["Add at least one technology."],
        },
        message: "Failed to create project.",
    };
  }

  //Insert the project into PostgreSQL
  
const technologiesValue = technologiesArray.join(",");

try{
    await sql`
  INSERT INTO projects (
    title,
    description,
    type,
    technologies,
    link,
    year_completed
  )
  VALUES (
    ${title},
    ${description},
    ${type},
    string_to_array(${technologiesValue}, ','),
    ${link || null},
    ${yearCompleted}
  )
`;

}catch (error){
    console.error("Failed to create project:", error);

    return {
        message: "Database Error: Failed to create project.",
    };

}



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
