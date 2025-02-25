import { Handlers, PageProps } from '$fresh/server.ts'
import { JobDetails } from '../../../components/JobDetails.tsx'
import { getJobById, Job } from '../../../src/job.ts'
import { redirect } from '../../../src/api.ts'

export const handler: Handlers = {
    async GET(req, ctx) {
        const id = ctx.params.id
        const job = await getJobById(id)
        if (!job) {
            return ctx.renderNotFound()
        }

        if (!job.courier.phone) return redirect(`/job/${job.id}/contacts`)

        return ctx.render({ job })
    },
}

export default function JobPage(props: PageProps<{ job: Job }>) {
    const { job } = props.data
    return <JobDetails job={job} />
}
