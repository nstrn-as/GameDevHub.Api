import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import {
    getProjects,
    deleteProject
} from "../services/ProjectApiService";
import type { Project } from "../types/Project";

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            setError("Failed to load projects.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        try {
            await deleteProject(id);
            await loadProjects();
        } catch (error) {
            console.error(error);
            setError("Failed to delete project.");
        }
    }

    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Projects</h1>

            <ProjectForm onProjectCreated={loadProjects} />

            <div>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        engine={project.engine}
                        genre={project.genre}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;