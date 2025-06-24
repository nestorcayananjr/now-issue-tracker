import { ExistingIssues } from "./IssuesType"

export type IssuesComponentProps = {
    title: string;
    issue_description: string;
    status: string;
    project_id: string;
    id: number;
    setIssues: React.Dispatch<React.SetStateAction<ExistingIssues[]>>;
    currentIssues: ExistingIssues[];
}