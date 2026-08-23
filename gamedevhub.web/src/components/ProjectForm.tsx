import { useState } from "react";
import { createProject } from "../services/ProjectApiService";

interface ProjectFormProps {
    onProjectCreated: () => void;
}

function ProjectForm({ onProjectCreated }: ProjectFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [engine, setEngine] = useState("");
    const [genre, setGenre] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            await createProject({
                title,
                description,
                engine,
                genre
            });

            setTitle("");
            setDescription("");
            setEngine("");
            setGenre("");

            onProjectCreated();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <div>
                <label>Engine</label>
                <input
                    value={engine}
                    onChange={(event) => setEngine(event.target.value)}
                />
            </div>

            <div>
                <label>Genre</label>
                <input
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                />
            </div>

            <button type="submit">
                Create Project
            </button>
        </form>
    );
}

export default ProjectForm;