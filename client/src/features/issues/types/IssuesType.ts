export type NewIssue = {
    title: string,
    issue_description: string,
    status: string,
    project_id: string
}

export type ExistingIssues = {
    title: string,
    issue_description: string,
    status: string,
    project_id: string,
    id: number
}