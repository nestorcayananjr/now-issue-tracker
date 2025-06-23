import React, { useState } from "react"
import axios from "axios"
import { Project } from "../types/Project"

type CreateProjectProps = {
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

const CreateProjectForm: React.FC<CreateProjectProps> = ({setProjects}) => {
    const [projectName, setProjectName] = useState('')

    const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      };

    const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value)
    }

    const handleProjectSubmit = async () => {
        try {
            const newProject = await axios.post('http://localhost:5001/api/projects', {project_name: projectName}, config)
            const newProjectData: Project = newProject.data

            setProjects((prevState) => {
                const newState: Project[] =  [...prevState, newProjectData]
                return newState;
            })
        } catch (error) {
            throw new Error("Error creating new project " + error)
        }
    }
    
    return (
        <div className="project-form">
            <h2>Create a New Project</h2>
            <div className="registration-field">
                <label htmlFor="name">Project Name: </label>
                <input onChange={(e) => handleProjectChange(e)} name="name" id="name" type={"text"} />
            </div>
            <div className="registration-button-container">
                <button onClick={() => handleProjectSubmit()}>Submit</button>
            </div>
        </div>
    )
}
export default CreateProjectForm