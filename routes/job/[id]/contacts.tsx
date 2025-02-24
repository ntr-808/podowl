import { Handlers, PageProps } from '$fresh/server.ts'
import { ContactDetailsForm } from '../../../components/ContactDetailsForm.tsx'
import { getJobById, Job, updateJobContacts } from '../../../src/job.ts'

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
        const contactData = {
            senderEmail: form.get('senderEmail') as string,
            driverName: form.get('driverName') as string,
            driverPhone: form.get('driverPhone') as string,
        }

        await updateJobContacts(id, contactData)
        return new Response('', {
            status: 303,
            headers: { Location: `/job/${id}/status` },
        })
    },
}

export default function JobContactsPage(props: PageProps<{ job: Job }>) {
    const { job } = props.data
    return (
        <ContactDetailsForm
            jobData={{
                items: job.items,
                address: job.destination.address,
                consignmentNumber: job.consignment.toString(),
            }}
        />
    )
}
