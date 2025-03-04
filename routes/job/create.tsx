import { Handlers } from '$fresh/server.ts'
import { createJob } from '../../src/job.ts'

export const handler: Handlers = {
    async POST(req) {
        const form = await req.formData()
        const jobData = {
            originAddress: form.get('originAddress') as string,
            originContactName: form.get('originContactName') as string,
            originContactPhone: form.get('originContactPhone') as string,

            destinationAddress: form.get('destinationAddress') as string,
            destinationContactName: form.get(
                'destinationContactName',
            ) as string,
            destinationContactPhone: form.get(
                'destinationContactPhone',
            ) as string,

            consignmentNumber: form.get('consignmentNumber') as string,
            referenceNumber: form.get('referenceNumber') as string,
            items: form.get('items') as string,
        }

        console.log(jobData)

        const job = await createJob(jobData)
        return new Response('', {
            status: 303,
            headers: { Location: `/job/${job.id}/contacts` },
        })
    },
}
