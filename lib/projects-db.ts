import { sql} from '@vercel/postgres';


export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
  year_completed: number | null;
}


export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;

  }

  const { rows } = await sql<Project>`
  SELECT * FROM projects ORDER BY id
  `;
  return rows;
}


export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
  SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}


const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]>{
  const searchTerm = `%${query.trim()}%`;
  const page = Number.isSafeInteger(currentPage) && currentPage > 0
  ?currentPage
  : 1;
  const offset = (page -1) * ITEMS_PER_PAGE;

  const { rows } = await sql<Project>`
  SELECT *
  FROM projects
  WHERE title ILIKE ${searchTerm}
    OR description ILIKE ${searchTerm}
  ORDER BY id
  LIMIT ${ITEMS_PER_PAGE}
  OFFSET ${offset}
  `;
  return rows;


}


export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const searchTerm = `%${ query.trim()}%`;

  const { rows } = await sql<{ count: string}>`
  SELECT COUNT(*) AS count
  FROM projects
  WHERE title ILIKE ${searchTerm}
    OR description ILIKE ${searchTerm}
  `;

  const totalProjects = Number(rows[0]?.count ?? 0);

  return Math.ceil(totalProjects / ITEMS_PER_PAGE);
}