import { Handlers, PageProps } from '$fresh/server.ts'
import { JobList } from '../components/JobList.tsx'
import { getJobs, Job } from '../src/job.ts'

export const handler: Handlers = {
    GET(req, ctx) {
        const url = new URL(req.url)
        const filter =
            url.searchParams.get('filter') as 'All' | 'Completed' | 'Transit' ||
            'All'
        const jobs = getJobs()
        return ctx.render({ jobs, filter })
    },
}

export default function JobsPage(
    props: PageProps<{ jobs: Job[]; filter: string }>,
) {
    const { jobs, filter } = props.data
    return <JobList jobs={jobs} filter={filter} />
}
