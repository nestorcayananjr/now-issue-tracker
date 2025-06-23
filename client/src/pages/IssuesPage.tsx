import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router"
import CreateIssuesForm from "../features/issues/components/CreateIssueForm";
import axios from "axios";
import { ExistingIssues } from "../features/issues/types/IssuesType";

const IssuesPage = () => {
    const { id } = useParams<{id: string}>();
    const location = useLocation();
    const navigate = useNavigate();

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
        }, [id])

    const closeIssue = (id: number) => {
        try {
            const updatedIssue: ExistingIssues = (issues.filter((issue) => issue.id === id)[0])

            axios.patch(`http://localhost:5001/api/issues/${id}`, {
                ...updatedIssue,
                status: updatedIssue.status === "open" ? "closed" : "open"
            }, { withCredentials: true})

            setIssues((prevState) => {
                return prevState.map((issue) =>
                issue.id === id
                  ? { ...issue, status: issue.status === 'open' ? 'closed' : 'open' }
                  : issue
            )})

        } catch (error) {
            throw new Error("Error updating issue" + error)
        }
    }

    const issueComponents = issues.map((issue: ExistingIssues) => {
        return (
            <div className="issue-box">
                <span>Title: {issue.title} </span>
                <span>Description: {issue.issue_description}</span>
                <span>Status: {issue.status}</span>
                <button onClick={() => closeIssue(issue.id)}>Mark as {issue.status === "open" ? "Closed" : "Open"} </button>
            </div>
        )
    })


    return (
        <div className="issues-page-container">
            <div className="issues-container">
                <h2> {location.state.projectName} Current Issues </h2>
                {issueComponents}
                <button onClick={() => navigate('/dashboard')}>Go back to projects page</button>
            </div>
            <CreateIssuesForm projectId={id!} setIssues={setIssues}/>
        </div>
    )
}

export default IssuesPage