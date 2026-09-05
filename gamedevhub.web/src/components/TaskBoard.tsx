import { useState } from "react";
import type { Task, TaskStatus } from "../types/Task";
import { updateTask } from "../services/TaskApiService";
import TaskColumn from "./TaskColumn";
import "./TaskBoard.css";

interface TaskBoardProps {
    tasks: Task[];
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: number) => void;
}

function TaskBoard({
    tasks,
    onTaskUpdated,
    onTaskDeleted
}: TaskBoardProps) {

    const [draggedTask, setDraggedTask] =
        useState<Task | null>(null);

    function handleDragStart(task: Task) {
        setDraggedTask(task);
    }

    async function handleDrop(newStatus: TaskStatus) {
        if (!draggedTask) {
            return;
        }

        if (draggedTask.status === newStatus) {
            setDraggedTask(null);
            return;
        }

        try {
            await updateTask(
                draggedTask.projectId,
                draggedTask.id,
                {
                    title: draggedTask.title,
                    description: draggedTask.description,
                    status: newStatus
                }
            );

            onTaskUpdated({
                ...draggedTask,
                status: newStatus
            });

        } catch (error) {
            console.error(error);
        }

        setDraggedTask(null);
    }

    const todoTasks = tasks.filter(
        task => task.status === "Todo"
    );

    const inProgressTasks = tasks.filter(
        task => task.status === "InProgress"
    );

    const doneTasks = tasks.filter(
        task => task.status === "Done"
    );

    return (
        <div className="task-board">

            <TaskColumn
                title="Todo"
                status="Todo"
                tasks={todoTasks}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
            />

            <TaskColumn
                title="In Progress"
                status="InProgress"
                tasks={inProgressTasks}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
            />

            <TaskColumn
                title="Done"
                status="Done"
                tasks={doneTasks}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
            />

        </div>
    );
}

export default TaskBoard;