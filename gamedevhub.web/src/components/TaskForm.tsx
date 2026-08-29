import { useState } from "react";
import { createTask } from "../services/TaskApiService";
import type { Task } from "../types/Task";

interface TaskFormProps {
    projectId: number;
    onTaskCreated: (task: Task) => void;
}

function TaskForm({
    projectId,
    onTaskCreated
}: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        try {
            setError("");

            const task = await createTask({
                title,
                description,
                projectId
            });

            onTaskCreated(task);

            setTitle("");
            setDescription("");
        } catch (error) {
            console.error(error);
            setError("Failed to create task.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Task</h3>

            <div>
                <label htmlFor="task-title">
                    Title
                </label>

                <input
                    id="task-title"
                    name="title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />
            </div>

            <div>
                <label htmlFor="task-description">
                    Description
                </label>

                <textarea
                    id="task-description"
                    name="description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />
            </div>

            {error && <p>{error}</p>}

            <button type="submit">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;