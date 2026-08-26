import type { Task } from "../types/Task";

interface TaskCardProps {
    task: Task;
}

function TaskCard({ task }: TaskCardProps) {
    return (
        <div>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>
        </div>
    );
}

export default TaskCard;