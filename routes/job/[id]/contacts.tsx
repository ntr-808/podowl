import { ContactDetailsForm } from '../../../components/ContactDetailsForm.tsx'

import { Handlers, RouteContext } from '$fresh/server.ts'

export interface JobFormData {
    senderName: string
    receiverName: string
    address: string
    consignmentNumber: string
    referenceNumber: string
    items: string
}

export const handler: Handlers = {
    async POST(req, ctx: RouteContext) {
        console.log(req)
        const form = await req.formData()
        console.log(form)

        return new Response('', {
            status: 303,
            headers: { Location: '/job/124/status' },
        })
    },
}

export default function Home() {
    return <ContactDetailsForm />
}
