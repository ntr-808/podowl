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

function formatItemText(items: Item[]) {
    return items
        .map((i) => `- ${i.description}`)
        .join('\n')
}

export function onWaitingSender(job: Job) {
    const itemText = formatItemText(job.items)
    const body = `
        Hello ${job.sender.name},
        your delivery to ${job.receiver.name}
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
        Hello ${job.receiver.name},
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
        ${job.sender.name}
        ${job.origin.address}
        ${job.sender.phone}
        ${job.sender.email}

        Items:
        ${itemText}
        --------------------------

        --------------------------
        Destination:
        ${job.receiver.name}
        ${job.destination.address}
        ${job.receiver.phone}
        ${job.receiver.email}
        --------------------------
    `

    return body
}

export function onTransitSender(job: Job) {
    return `
        Your delivery to ${job.receiver.name}
        has been collected by ${job.courier.name}.
        You will be notified of any updates.
    `
}

export function onTransitReceiver(job: Job) {
    const itemText = formatItemText(job.items)

    return `
        Hello ${job.receiver.name},
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
        ${job.receiver.name}
        ${job.destination.address}
        ${job.receiver.phone}
        ${job.receiver.email}
        --------------------------
    `
}

export function onCompleteSender(job: Job) {
    return `
        Your delivery to ${job.receiver.name}
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
