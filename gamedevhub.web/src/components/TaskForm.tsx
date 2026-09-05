import { useState } from "react";
import { createTask } from "../services/TaskApiService";
import type { Task, TaskPriority } from "../types/Task";

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
    const [priority, setPriority] =
        useState<TaskPriority>("Medium");
    const [dueDate, setDueDate] = useState("");
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
                projectId,
                priority,
                dueDate: dueDate || null
            });

            onTaskCreated(task);

            setTitle("");
            setDescription("");
            setPriority("Medium");
            setDueDate("");

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
                    value={title}
                    onChange={event =>
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
                    value={description}
                    onChange={event =>
                        setDescription(event.target.value)
                    }
                />
            </div>

            <div>
                <label htmlFor="task-priority">
                    Priority
                </label>

                <select
                    id="task-priority"
                    value={priority}
                    onChange={event =>
                        setPriority(
                            event.target.value as TaskPriority
                        )
                    }
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div>
                <label htmlFor="task-due-date">
                    Due date
                </label>

                <input
                    id="task-due-date"
                    type="date"
                    value={dueDate}
                    onChange={event =>
                        setDueDate(event.target.value)
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