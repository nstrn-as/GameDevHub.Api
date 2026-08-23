import { useState } from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    id: number;
    title: string;
    engine: string;
    genre: string;
    onDelete: (id: number) => void;
}

function ProjectCard({
    id,
    title,
    engine,
    genre,
    onDelete
}: ProjectCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div>
            <h2>{title}</h2>

            <p>Engine: {engine}</p>
            <p>Genre: {genre}</p>

            <Link to={`/projects/${id}`}>
                View Project
            </Link>

            <button onClick={() => onDelete(id)}>
                Delete
            </button>

            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>

            {showDetails && (
                <p>
                    This is the description of {title}.
                </p>
            )}
        </div>
    );
}

export default ProjectCard;