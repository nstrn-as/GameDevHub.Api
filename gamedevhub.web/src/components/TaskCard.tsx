import { useState } from "react";
import type { Task } from "../types/Task";
import { deleteTask, updateTask } from "../services/TaskApiService";
import "./TaskCard.css";

interface TaskCardProps {
    task: Task;
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: number) => void;
    onDragStart: (task: Task) => void;
}

function TaskCard({
    task,
    onTaskUpdated,
    onTaskDeleted,
    onDragStart
}: TaskCardProps) {
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(
        task.description
    );

    const [error, setError] = useState("");

    async function handleUpdate() {
        try {
            setError("");

            await updateTask(
                task.projectId,
                task.id,
                {
                    title,
                    description,
                    status: task.status
                }
            );

            onTaskUpdated({
                ...task,
                title,
                description
            });

            setEditing(false);
        } catch (error) {
            console.error(error);
            setError("Failed to update task.");
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTask(
                task.id,
                task.projectId
            );

            onTaskDeleted(task.id);
        } catch (error) {
            console.error(error);
            setError("Failed to delete task.");
        }
    }

    if (editing) {
        return (
            <div className="task-card">
                <input
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <textarea
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                {error && <p>{error}</p>}

                <button onClick={handleUpdate}>
                    Save
                </button>

                <button
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <div
            className="task-card"
            draggable
            onDragStart={() => onDragStart(task)}
        >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <label htmlFor={`task-status-${task.id}`}>
                Status
            </label>

            <select
                id={`task-status-${task.id}`}
                name="status"
                value={task.status}
                onChange={async (event) => {
                    const newStatus = event.target.value;

                    try {
                        await updateTask(
                            task.projectId,
                            task.id,
                            {
                                title: task.title,
                                description: task.description,
                                status: newStatus
                            }
                        );

                        onTaskUpdated({
                            ...task,
                            status: newStatus
                        });
                    } catch (error) {
                        console.error(error);
                        setError("Failed to update status.");
                    }
                }}
            >
                <option value="Todo">Todo</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            {error && <p>{error}</p>}

            <button onClick={() => setEditing(true)}>
                Edit
            </button>

            <button onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
}

export default TaskCard;