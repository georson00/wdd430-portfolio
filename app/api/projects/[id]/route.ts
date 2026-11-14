import { NextResponse } from 'next/server';
import { getProjectById } from "@/lib/projects-db";

export async function GET(
    _request: Request,
    { params }: { params: { id: string} }
) {
    const {id}  =  await params;
    const ProjectId = Number(id);

    if (Number.isNaN(ProjectId)) {
        return NextResponse.json(
            {error: 'Invalid id' }, 
            {status: 400});
    }

    const project = await getProjectById(ProjectId);
    if (!project) {
        return NextResponse.json(
            { error: "Not found"},
            {status: 404});

    }
    return NextResponse.json(project);

}