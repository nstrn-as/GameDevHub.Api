export type TaskStatus =
    | "Todo"
    | "InProgress"
    | "Done";

export interface Task {
    id: number;
    projectId: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdDate: string;
    lastModified: string;
}