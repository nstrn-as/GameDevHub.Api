import type {
    Task,
    TaskPriority,
    TaskStatus
} from "../types/Task";

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

export async function createTask(task: {
    title: string;
    description: string;
    projectId: number;
    priority: TaskPriority;
    dueDate: string | null;
}): Promise<Task> {
    const response = await fetch(
        `${API_URL}/projects/${task.projectId}/tasks`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create task.");
    }

    return await response.json();
}

export async function updateTask(
    projectId: number,
    taskId: number,
    task: {
        title: string;
        description: string;
        status: TaskStatus;
        priority: TaskPriority;
        dueDate: string | null;
    }
): Promise<void> {
    const response = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update task.");
    }
}

export async function deleteTask(
    id: number,
    projectId: number
): Promise<void> {
    const response = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete task.");
    }
}