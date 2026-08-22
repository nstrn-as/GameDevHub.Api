interface ProjectCardProps {
    title: string;
    engine: string;
    genre: string;
}

function ProjectCard({ title, engine, genre }: ProjectCardProps) {
    return (
        <div>
            <h2>{title}</h2>
            <p>Engine: {engine}</p>
            <p>Genre: {genre}</p>
        </div>
    );
}

export default ProjectCard;