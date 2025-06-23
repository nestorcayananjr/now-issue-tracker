import axios from "axios"
import React, { useState } from "react"
import { NewIssue, ExistingIssues } from "../types/IssuesType"

type CreateIssuesFormProps = {
    projectId: string;
    setIssues: React.Dispatch<React.SetStateAction<ExistingIssues[]>>
}

const CreateIssuesForm:React.FC<CreateIssuesFormProps> = ({projectId, setIssues}) => {
    const [issue, setIssue] = useState<NewIssue>({
        title: '',
        issue_description: '',
        status: 'open',
        project_id: projectId
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const field = e.target.name as keyof NewIssue
        setIssue((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }))}

    const handleClick = async () => {
        try {
            const newIssueId = await axios.post("http://localhost:5001/api/issues", issue, {
                withCredentials: true
            })
            console.log(newIssueId.data);
            setIssues((prevState) => {
                return [...prevState, newIssueId.data]
            })
        } catch (error) {
            throw new Error("Error creating new issue" + error)
        }
    }

    return (
        <div>
            <label htmlFor="title">Title</label>
            <input onChange={(e) => handleChange(e)} name="title" id="title" type={"text"} />

            <label htmlFor="issue_description">Description</label>
            <textarea onChange={(e) => handleChange(e)} name="issue_description" id="issue_description"/>
            
            <label htmlFor="status">Status</label>
            <select onChange={(e) => handleChange(e)} name="title" id="status">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
            </select>
            <button onClick={() => handleClick()}>Create Issue</button>
        </div>
    )
}

export default CreateIssuesForm