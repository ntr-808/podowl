import { Handlers, PageProps } from '$fresh/server.ts'
import { DeliveryConfirmation } from '../../../components/DeliveryConfirmation.tsx'
import { Pickup } from '../../../components/Pickup.tsx'
import { onComplete } from '../../../src/email.ts'
import { getJobById, pickup } from '../../../src/job.ts'

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
        const collectedItems: string[] = []
        for (const [key, value] of form.entries()) {
            if (key.startsWith('collectedItems[')) {
                collectedItems.push(value.toString())
            }
        }

        const job = await pickup(id, collectedItems)
        // await onComplete(job)

        return new Response('', {
            status: 303,
            headers: { Location: `/job/${id}/status` },
        })
    },
}

export default function PickupPage(props: PageProps<{ job: Job }>) {
    const { job } = props.data
    return <Pickup job={job} />
}
