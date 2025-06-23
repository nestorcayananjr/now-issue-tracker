import { Project } from "../types/Project"
import { useNavigate } from "react-router"

const ProjectComponent: React.FC<Project> = ({project_name, id, created_by}) => {
    const navigate = useNavigate();

    return (
        <div>
            <span>Project Name: {project_name}</span>
            <button onClick={() => navigate(`/issues/${id}`)}>See Details</button>
        </div>
    )
}

export default ProjectComponent