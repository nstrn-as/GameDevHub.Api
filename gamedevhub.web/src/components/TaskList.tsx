import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { getTasksByProject } from "../services/TaskApiService";
import TaskForm from "./TaskForm";
import TaskBoard from "./TaskBoard";

interface TaskListProps {
    projectId: number;
}

function TaskList({ projectId }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, [projectId]);

    async function loadTasks() {
        try {
            const data = await getTasksByProject(projectId);
            setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <section>
            <h2>Tasks</h2>

            <TaskForm
                projectId={projectId}
                onTaskCreated={(task) => {
                    setTasks((currentTasks) => [
                        ...currentTasks,
                        task
                    ]);
                }}
            />

            <TaskBoard
                tasks={tasks}
                onTaskUpdated={(updatedTask) => {
                    setTasks((currentTasks) =>
                        currentTasks.map((task) =>
                            task.id === updatedTask.id
                                ? updatedTask
                                : task
                        )
                    );
                }}
                onTaskDeleted={(id) => {
                    setTasks((currentTasks) =>
                        currentTasks.filter(
                            (task) => task.id !== id
                        )
                    );
                }}
            />
        </section>
    );
}

export default TaskList;