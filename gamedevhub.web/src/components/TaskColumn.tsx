import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    status: string;
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: number) => void;
    onDragStart: (task: Task) => void;
    onDrop: (status: string) => void;
}

function TaskColumn({
    title,
    tasks,
    status,
    onTaskUpdated,
    onTaskDeleted,
    onDragStart,
    onDrop
}: TaskColumnProps) {
    return (
        <div
            className="task-column"
            onDragOver={(event) => {
                event.preventDefault();
            }}
            onDrop={() => onDrop(status)}
        >
            <h2>{title}</h2>

            {tasks.length === 0 ? (
                <p>No tasks.</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onTaskUpdated={onTaskUpdated}
                        onTaskDeleted={onTaskDeleted}
                        onDragStart={onDragStart}
                    />
                ))
            )}
        </div>
    );
}

export default TaskColumn;