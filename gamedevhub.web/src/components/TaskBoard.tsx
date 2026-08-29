import type { Task } from "../types/Task";
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
    const todoTasks = tasks.filter(
        (task) => task.status === "Todo"
    );

    const inProgressTasks = tasks.filter(
        (task) => task.status === "InProgress"
    );

    const doneTasks = tasks.filter(
        (task) => task.status === "Done"
    );

    return (
        <div className="task-board">
            <TaskColumn
                title="Todo"
                tasks={todoTasks}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
            />

            <TaskColumn
                title="In Progress"
                tasks={inProgressTasks}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
            />

            <TaskColumn
                title="Done"
                tasks={doneTasks}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
            />
        </div>
    );
}

export default TaskBoard;