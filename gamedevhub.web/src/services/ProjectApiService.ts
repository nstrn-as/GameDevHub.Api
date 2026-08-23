import type { Project } from "../types/Project";

const API_URL = "https://localhost:7172/api/projects";

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch projects.");
    }

    return await response.json();
}

export async function createProject(project: {
    title: string;
    description: string;
    engine: string;
    genre: string;
}): Promise<Project> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    });

    if (!response.ok) {
        throw new Error("Failed to create project.");
    }

    return await response.json();
}