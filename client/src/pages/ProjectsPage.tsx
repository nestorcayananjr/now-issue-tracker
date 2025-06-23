import axios from "axios"
import React, {useState, useMemo, useEffect} from "react"
import CreateProjectForm from "../features/projects/components/CreateProjectForm"
import ProjectComponent from "../features/projects/components/ProjectComponent"
import { Project } from "../features/projects/types/Project"

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])

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
            <ProjectComponent project_name={project.project_name} id={project.id} created_by={project.created_by} />
        )
    })

    return (
        <div>
            <h1>Projects Page</h1>
            <CreateProjectForm />
            {projectComponents}
        </div>
    )
}

export default ProjectsPage