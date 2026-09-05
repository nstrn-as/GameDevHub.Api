export type TaskStatus =
    | "Todo"
    | "InProgress"
    | "Done";

export type TaskPriority =
    | "Low"
    | "Medium"
    | "High";

export interface Task {
    id: number;
    projectId: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string | null;
    createdDate: string;
    lastModified: string;
}