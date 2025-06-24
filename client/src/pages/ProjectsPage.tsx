import axios, { AxiosError } from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router"
import CreateProjectForm from "../features/projects/components/CreateProjectForm"
import ProjectComponent from "../features/projects/components/ProjectComponent"
import { Project } from "../features/projects/types/Project"

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        const fetchProjects = async () => {
            try {
                const projects = await axios.get('http://localhost:5001/api/projects', {
                    withCredentials: true
                })
                setProjects(projects.data)
            } catch (error: unknown) {
                if (error instanceof AxiosError){
                    if (error.status === 401){
                        alert("You are currently not logged in, being redirected to log in page...")
                        navigate('/')
                    }
                }
            }
        }

        fetchProjects()

        return () => {
            controller.abort(); // cleanup on unmount
        };
        }, [])

    const projectComponents = projects.map((project: Project) => {
        return (
            <ProjectComponent key={project.id} project_name={project.project_name} id={project.id} created_by={project.created_by} />
        )
    })

    return (
        <div className="project-page-container">
            <div className="project-container">
                <h1>Current Projects</h1>
                {projectComponents}
            </div>
            <CreateProjectForm setProjects={setProjects}/>
        </div>
    )
}

export default ProjectsPage