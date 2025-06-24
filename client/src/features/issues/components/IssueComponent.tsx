import { IssuesComponentProps } from '../types/IssuesComponentProps'
import { ExistingIssues } from '../types/IssuesType'
import axios from 'axios'

const IssueComponent: React.FC<IssuesComponentProps> = ({title, issue_description, status, id, project_id, setIssues, currentIssues}) => {

    const closeIssue = (id: number) => {
        try {
            const updatedIssue: ExistingIssues = (currentIssues.filter((issue) => issue.id === id)[0])

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

    return (
        <div className="issue-box">
            <span>Title: {title} </span>
            <span>Description: {issue_description}</span>
            <span>Status: {status}</span>
            <button onClick={() => closeIssue(id)}>Mark as {status === "open" ? "Closed" : "Open"} </button>
        </div>
    )
}

export default IssueComponent;