import { useState } from "react";

interface ProjectCardProps {
    title: string;
    engine: string;
    genre: string;
}

function ProjectCard({ title, engine, genre }: ProjectCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [favorite, setFavorite] = useState(false);

    return (
        <div>
            <h2>{title}</h2>

            <p>Engine: {engine}</p>
            <p>Genre: {genre}</p>

            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>

            {showDetails && (
                <p>
                    This is the description of {title}.
                </p>
            )}

            <button onClick={() => setFavorite(!favorite)}>
                {favorite ? "Favorited" : "Favoite"}
            </button>
        </div>
    );
}

export default ProjectCard;