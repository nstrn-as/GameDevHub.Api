import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { getTasksByProject } from "../services/TaskApiService";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

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

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))
            )}
        </section>
    );
}

export default TaskList;