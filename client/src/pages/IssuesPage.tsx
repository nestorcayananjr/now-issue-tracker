import { useState, useEffect } from "react"
import { useParams } from "react-router"
import CreateIssuesForm from "../features/issues/components/CreateIssueForm";
import axios from "axios";
import { ExistingIssues } from "../features/issues/types/IssuesType";

const IssuesPage = () => {
    const { id } = useParams<{id: string}>();

    const [issues, setIssues] = useState<ExistingIssues[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchIssues = async () => {
            try {
                const issues = await axios.get(`http://localhost:5001/api/issues/${id}`, {
                    withCredentials: true
                })
                setIssues(issues.data)
            } catch (error) {
                throw new Error("Error grabbing intial issues" + error)
            }
        }

        fetchIssues()

        return () => {
            controller.abort(); // cleanup on unmount
        };
        }, [])

    const closeIssue = (id: number) => {
        try {
            const updatedIssue: ExistingIssues = (issues.filter((issue) => issue.id === id)[0])

            axios.patch(`http://localhost:5001/api/issues/${id}`, {
                ...updatedIssue,
                status: updatedIssue.status === "open" ? "closed" : "open"
            }, { withCredentials: true})
        } catch (error) {
            throw new Error("Error updating issue" + error)
        }
    }

    const issueComponents = issues.map((issue: ExistingIssues) => {
        console.log(issue)
        return (
            <div>
                <span>Title: {issue.title} </span>
                <span>Description: {issue.issue_description}</span>
                <span>Status: {issue.status}</span>
                <button onClick={() => closeIssue(issue.id)}>Mark as Closed</button>
            </div>
        )
    })


    return (
        <div>
            <h1>Issues Page for {id}</h1>
            <CreateIssuesForm projectId={id!} />
            {issueComponents}
        </div>
    )
}

export default IssuesPage