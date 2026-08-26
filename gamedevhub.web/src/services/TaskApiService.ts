import type { Task } from "../types/Task";

const API_URL = "https://localhost:7172/api";

export async function getTasksByProject(
    projectId: number
): Promise<Task[]> {
    const response = await fetch(
        `${API_URL}/projects/${projectId}/tasks`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch tasks.");
    }

    return await response.json();
}