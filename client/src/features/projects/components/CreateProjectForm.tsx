import React, { useState } from "react"
import axios from "axios"

const CreateProjectForm = () => {
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
            console.log(newProject.data)
        } catch (error) {
            throw new Error("Error creating new project " + error)
        }
    }
    return (
        <div>
            <h2>Create a New Project</h2>
            <label htmlFor="name">Name</label>
            <input onChange={(e) => handleProjectChange(e)} name="name" id="name" type={"text"} />
            <button onClick={() => handleProjectSubmit()}>Submit</button>
        </div>
    )
}
export default CreateProjectForm