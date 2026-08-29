import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: number) => void;
}

function TaskColumn({
    title,
    tasks,
    onTaskUpdated,
    onTaskDeleted
}: TaskColumnProps) {
    return (
        <div>
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
                    />
                ))
            )}
        </div>
    );
}

export default TaskColumn;