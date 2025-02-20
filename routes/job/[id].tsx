import { FreshContext } from '$fresh/server.ts'
import { newJob } from '../../src/job.ts'
import { formatItemText } from '../../src/sms.ts'

export default function JobPage(_req: Request, _ctx: FreshContext) {
    const job = newJob()

    return (
        <div>
            <h1>{job.sender.name}</h1>
            <p>{formatItemText(job.items)}</p>
        </div>
    )
}
