import { Handlers, PageProps } from '$fresh/server.ts'
import { DeliveryConfirmation } from '../../../components/DeliveryConfirmation.tsx'
import { completeJob, getJobById } from '../../../src/job.ts'

export const handler: Handlers = {
    GET(req, ctx) {
        const id = ctx.params.id
        const job = getJobById(id)
        if (!job) {
            return ctx.renderNotFound()
        }
        return ctx.render({ job })
    },
    async POST(req, ctx) {
        const id = ctx.params.id
        const form = await req.formData()
        const confirmationData = {
            recipientName: form.get('recipientName') as string,
            itemsDelivered: form.get('itemsDelivered') as string,
            signature: form.get('signature') as string,
        }

        await completeJob(id, confirmationData)

        console.log('job done')
        return new Response('', {
            status: 303,
            headers: { Location: `/` },
        })
    },
}

export default function JobConfirmPage(props: PageProps<{ job: Job }>) {
    const { job } = props.data
    return <DeliveryConfirmation job={job} />
}
