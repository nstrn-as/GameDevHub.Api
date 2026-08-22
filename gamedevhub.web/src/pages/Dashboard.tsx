import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

function Dashboard() {
    return (
        <div>
            <h1>Welcome to GameDevHub</h1>

            <ProjectCard
                title="My RPG"
                engine="Unity"
                genre="RPG"
            />

            <ProjectCard
                title="Space Game"
                engine="Godot"
                genre="Strategy"
            />

            <ProjectForm />
        </div>
    );
}

export default Dashboard;