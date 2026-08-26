import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/ProjectApiService";
import EditProjectForm from "../components/EditProjectForm";
import type { Project } from "../types/Project";
import TaskList from "../components/TaskList";

function ProjectDetails() {
    const { id } = useParams();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadProject();
    }, [id]);

    async function loadProject() {
        try {
            const data = await getProjectById(Number(id));
            setProject(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load project.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading project...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    if (editing) {
        return (
            <div>
                <EditProjectForm
                    project={project}
                    onProjectUpdated={async () => {
                        await loadProject();
                        setEditing(false);
                    }}
                />

                <button onClick={() => setEditing(false)}>
                    Cancel
                </button>

            </div>
        );
    }

    return (
        <div>
            <h1>{project.title}</h1>

            <p>
                <strong>Description:</strong>{" "}
                {project.description}
            </p>

            <p>
                <strong>Engine:</strong>{" "}
                {project.engine}
            </p>

            <p>
                <strong>Genre:</strong>{" "}
                {project.genre}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {project.status}
            </p>

            <p>
                <strong>Created:</strong>{" "}
                {project.createdDate}
            </p>

            <p>
                <strong>Last Modified:</strong>{" "}
                {project.lastModified}
            </p>

            <button onClick={() => setEditing(true)}>
                Edit
            </button>

            <TaskList projectId={project.id} />
        </div>
    );
}

export default ProjectDetails;