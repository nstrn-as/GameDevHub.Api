import ProjectCard from "../components/ProjectCard";

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

        </div>
    );
}

export default Dashboard;