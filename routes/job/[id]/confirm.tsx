import { Handlers, PageProps } from '$fresh/server.ts'
import { DeliveryConfirmation } from '../../../components/DeliveryConfirmation.tsx'
import { completeJob, getJobById } from '../../../src/job.ts'
import * as sms from '../../../src/sms.ts'
import * as email from '../../../src/email.ts'

export const handler: Handlers = {
    async GET(req, ctx) {
        const id = ctx.params.id
        const job = await getJobById(id)
        if (!job) {
            return ctx.renderNotFound()
        }
        return ctx.render({ job })
    },
    async POST(req, ctx) {
        const id = ctx.params.id
        const form = await req.formData()

        // Get all delivered items from the form
        const deliveredItems: string[] = []
        for (const [key, value] of form.entries()) {
            if (key.startsWith('deliveredItems[')) {
                deliveredItems.push(value.toString())
            }
        }

        const confirmationData = {
            recipientName: form.get('recipientName') as string,
            itemsDelivered: deliveredItems,
            signature: form.get('signature') as string,
        }

        const job = await completeJob(id, confirmationData)
        if (!job) throw new Error('update failed')

        await sms.onComplete(job)
        await email.onComplete(job)

        return new Response('', {
            status: 303,
            headers: { Location: `/jobs` },
        })
    },
}

export default function JobConfirmPage(props: PageProps<{ job: Job }>) {
    const { job } = props.data
    return <DeliveryConfirmation job={job} />
}
