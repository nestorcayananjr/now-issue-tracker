import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router"
import CreateIssuesForm from "../features/issues/components/CreateIssueForm";
import axios, { AxiosError } from "axios";
import { ExistingIssues } from "../features/issues/types/IssuesType";
import IssueComponent from "../features/issues/components/IssueComponent";

const IssuesPage = () => {
    const { id } = useParams<{id: string}>();
    const location = useLocation();
    const navigate = useNavigate();

    const [issues, setIssues] = useState<ExistingIssues[]>([]);
    const [projectName, setProjectName] = useState('')

    useEffect(() => {
        const controller = new AbortController();

        const fetchIssues = async () => {
            try {
                const issues = await axios.get(`http://localhost:5001/api/issues/${id}`, {
                    withCredentials: true
                })
                setIssues(issues.data.issues)
                setProjectName(issues.data.projectName)
            } catch (error) {
                if (error instanceof AxiosError && error.status === 403){
                    alert("You do not own this project, redirecting back to your projects.")
                    navigate('/dashboard')
                } else {
                    throw new Error ("Error fetching initial issues: " + error)
                }
                
            }
        }

        fetchIssues()

        return () => {
            controller.abort(); // cleanup on unmount
        };
        }, [id])

  

    const issueComponents = issues.map((issue: ExistingIssues) => {
        const { title, issue_description, status, id, project_id} = issue;
        return (
            <IssueComponent 
                key={id}
                title={title} 
                issue_description={issue_description} 
                status={status} id={id} 
                project_id={project_id}
                setIssues={setIssues}
                currentIssues={issues}
                />
        )
    })


    return (
        <div className="issues-page-container">
            <div className="issues-container">
                {!projectName ? <h1>Loading...</h1> : <h2> Current Issues for {projectName} </h2>}
                {issueComponents}
                <button onClick={() => navigate('/dashboard')}>Go back to projects page</button>
            </div>
            <CreateIssuesForm projectId={id!} setIssues={setIssues}/>
        </div>
    )
}

export default IssuesPage