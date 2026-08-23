import { useState } from "react";
import { updateProject } from "../services/ProjectApiService";
import type { Project } from "../types/Project";

interface EditProjectFormProps {
    project: Project;
    onProjectUpdated: (project: Project) => void;
}

function EditProjectForm({
    project,
    onProjectUpdated
}: EditProjectFormProps) {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [engine, setEngine] = useState(project.engine);
    const [genre, setGenre] = useState(project.genre);

    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            setError("");

            const updatedProject = await updateProject(project.id, {
                title,
                description,
                engine,
                genre
            });

            onProjectUpdated();
        } catch (error) {
            console.error(error);
            setError("Failed to update project.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Project</h2>

            <div>
                <label>Title</label>
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />
            </div>

            <div>
                <label>Engine</label>
                <input
                    value={engine}
                    onChange={(event) =>
                        setEngine(event.target.value)
                    }
                />
            </div>

            <div>
                <label>Genre</label>
                <input
                    value={genre}
                    onChange={(event) =>
                        setGenre(event.target.value)
                    }
                />
            </div>

            {error && <p>{error}</p>}

            <button type="submit">
                Save Changes
            </button>
        </form>
    );
}

export default EditProjectForm;