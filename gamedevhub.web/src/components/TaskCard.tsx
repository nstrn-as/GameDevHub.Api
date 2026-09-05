import { useState } from "react";
import type { Task, TaskPriority } from "../types/Task";
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
    const [priority, setPriority] =
        useState<TaskPriority>(task.priority);

    const [dueDate, setDueDate] =
        useState(
            task.dueDate
                ? task.dueDate.substring(0, 10)
                : ""
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
                    status: task.status,
                    priority,
                    dueDate: dueDate || null
                }
            );

            onTaskUpdated({
                ...task,
                title,
                description,
                priority,
                dueDate: dueDate || null
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

                <div>
                        <label htmlFor={`priority-${task.id}`}>
                            Priority
                        </label>

                        <select
                            id={`priority-${task.id}`}
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
                        <label htmlFor={`due-date-${task.id}`}>
                            Due date
                        </label>

                        <input
                            id={`due-date-${task.id}`}
                            type="date"
                            value={dueDate}
                            onChange={event =>
                                setDueDate(event.target.value)
                            }
                        />
                    </div>
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

            <p>
                Priority: {task.priority}
            </p>

            {task.dueDate && (
                <p>
                    Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}

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