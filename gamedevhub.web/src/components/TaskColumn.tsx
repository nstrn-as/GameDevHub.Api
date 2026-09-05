import type { Task, TaskStatus } from "../types/Task";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

interface TaskColumnProps {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: number) => void;
    onDrop: (status: TaskStatus) => void;
    onDragStart: (task: Task) => void;
}

function TaskColumn({
    title,
    status,
    tasks,
    onTaskUpdated,
    onTaskDeleted,
    onDrop,
    onDragStart
}: TaskColumnProps) {

    return (
        <div
            className="task-column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => onDrop(status)}
        >
            <h2>{title}</h2>

            <div className="task-column-content">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onTaskUpdated={onTaskUpdated}
                        onTaskDeleted={onTaskDeleted}
                        onDragStart={onDragStart}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskColumn;