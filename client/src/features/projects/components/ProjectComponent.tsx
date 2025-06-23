import { Project } from "../types/Project"
import { useNavigate } from "react-router"

const ProjectComponent: React.FC<Project> = ({project_name, id, created_by}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/issues/${id}`, {
            state: {
                projectName: project_name
            }
        })
    }

    return (
        <div className="project-box">
            <span>{project_name}</span>
            <button onClick={() => handleClick()}>See Details</button>
        </div>
    )
}

export default ProjectComponent