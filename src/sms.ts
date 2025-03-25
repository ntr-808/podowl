import twilio from 'twilio'
import { Item, Job } from './job.ts'

const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
const messagingServiceSid = Deno.env.get('TWILIO_MESSAGING_SID')

// https://www.twilio.com/docs/conversations/quickstart
export function sendSms(phone: string, body: string) {
    const twilioClient = twilio(accountSid, authToken)
    return twilioClient.messages
        .create({
            body,
            messagingServiceSid,
            to: phone,
        })
}

export function formatItemText(items: Item[]) {
    return items
        .map((i) => `- ${i.description}`)
        .join('\n')
}

export function onWaitingSender(job: Job) {
    const itemText = formatItemText(job.items)
    const body = `
Hello ${job.sender.name},
your delivery to ${job.destination.contact.name}
is currently ${job.status}.
your courier is ${job.courier.name}.

Items:
${itemText}
`

    return body
}

export function onWaitingReceiver(job: Job) {
    const itemText = formatItemText(job.items)
    const body = `
Hello ${job.destination.contact.name},
your delivery from ${job.sender.name}
to ${job.destination.address}
is being delivered by ${job.courier.name}.

Items:
${itemText}

Delivery Code: ${job.code}
`

    return body
}

export function onWaitingCourier(job: Job) {
    const itemText = formatItemText(job.items)
    const body = `
Hello ${job.courier.name},

--------------------------
Collection:
${job.origin.contact.name}
${job.origin.address}
${job.origin.contact.phone}
${job.origin.contact.email}

Items:
${itemText}
--------------------------

--------------------------
Destination:
${job.destination.contact.name}
${job.destination.address}
${job.destination.contact.phone}
${job.destination.contact.email}
--------------------------
`

    return body
}

export function onTransitSender(job: Job) {
    return `
Your delivery to ${job.destination.contact.name}
has been collected by ${job.courier.name}.
You will be notified of any updates.
`
}

export function onTransitReceiver(job: Job) {
    const itemText = formatItemText(job.items)

    return `
Hello ${job.destination.contact.name},
your delivery from ${job.sender.name}
has been collected.

On arrival:
1. confirm all items:
${itemText}

2. quote collection code:
${job.code}
`
}

export function onTransitCourier(job: Job) {
    return `
--------------------------
Destination:
${job.destination.contact.name}
${job.destination.address}
${job.destination.contact.phone}
${job.destination.contact.email}
--------------------------
`
}

export function onCompleteSender(job: Job) {
    return `
Your delivery to ${job.destination.contact.name}
is now complete.
`
}

export function onCompleteReceiver(_job: Job) {
    return `
:)
`
}

export function onCompleteCourier(_job: Job) {
    return `
A job well done.
Get yourself a snack.
`
}

export async function onWaiting(job: Job) {
    const courierBody =
        `PODOWL - ${job.consignment} Awaiting Pickup\nhttps://podowl.com.au/job/${job.id}/pickup`
    const courierSms = await sendSms(job.courier.phone, courierBody)
    console.log(courierSms)

    const senderBody =
        `PODOWL - ${job.consignment} Awaiting Pickup\nhttps://podowl.com.au/job/${job.id}/status`
    const senderSms = await sendSms(job.sender.phone, senderBody)
    console.log(senderSms)
}

export async function onTransit(job: Job) {
    const courierBody =
        `PODOWL - ${job.consignment} Delivery Confirmation\nhttps://podowl.com.au/job/${job.id}/confirm`
    const courierSms = await sendSms(job.courier.phone, courierBody)
    console.log(courierSms)

    const senderBody =
        `PODOWL - ${job.consignment} In Transit\nhttps://podowl.com.au/job/${job.id}/status`
    const senderSms = await sendSms(job.sender.phone, senderBody)
    console.log(senderSms)
}

export async function onComplete(job: Job) {
    const senderBody =
        `PODOWL - Job Complete\nhttps://podowl.com.au/job/${job.id}/status`
    const senderSms = await sendSms(job.sender.phone, senderBody)
    console.log(senderSms)
}
