import axios from "axios"
import {useState, useEffect} from "react"
import CreateProjectForm from "../features/projects/components/CreateProjectForm"
import ProjectComponent from "../features/projects/components/ProjectComponent"
import { Project } from "../features/projects/types/Project"

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const controller = new AbortController();

        const fetchProjects = async () => {
            try {
                const projects = await axios.get('http://localhost:5001/api/projects', {
                    withCredentials: true
                })
                setProjects(projects.data)
            } catch (error) {
                throw new Error("Error grabbing intial projects" + error)
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