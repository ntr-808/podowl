import { randomBetween } from '@std/random/between'

export interface Item {
    readonly description: string
    readonly delivered: boolean
}

export function item(description: string): Item {
    return {
        description,
        delivered: false,
    }
}

export interface Job {
    readonly id: string
    readonly created: Date
    readonly updated: Date
    readonly status: 'Waiting' | 'Transit' | 'Completed'
    readonly sender: Contact
    readonly receiver: Contact
    readonly courier: Contact
    readonly origin: Location
    readonly destination: Location
    readonly items: Item[]
    readonly consignment: number
    readonly code: number
    readonly signature?: string
    readonly podRecipientName?: string
    readonly deliveredItems?: {
        expected: string
        delivered: string
    }
}

export interface Contact {
    readonly name: string
    readonly phone: string
    readonly email: string
}

export interface Location {
    readonly address: string
}

// In-memory store for jobs
let jobs: Job[] = []

export function createJob(data: {
    senderName: string
    receiverName: string
    address: string
    phone: string
    consignmentNumber: string
    referenceNumber: string
    items: string
}): Job {
    const job: Job = {
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
        status: 'Transit',
        sender: {
            name: data.senderName,
            phone: data.phone,
            email: '',
        },
        receiver: {
            name: data.receiverName,
            phone: data.phone,
            email: '',
        },
        courier: {
            name: '',
            phone: '',
            email: '',
        },
        origin: {
            address: data.address,
        },
        destination: {
            address: data.address,
        },
        items: [item(data.items)],
        consignment: parseInt(data.consignmentNumber),
        code: Math.floor(randomBetween(1000, 10000)),
    }

    jobs.push(job)
    return job
}

export function getJobs(): Job[] {
    return jobs
}

export function getJobById(id: string): Job | undefined {
    return jobs.find((job) => job.id === id)
}

export function updateJobContacts(id: string, contactData: {
    senderEmail: string
    driverName: string
    driverPhone: string
}): void {
    const job = jobs.find((j) => j.id === id)
    if (job) {
        job.sender.email = contactData.senderEmail
        job.courier.name = contactData.driverName
        job.courier.phone = contactData.driverPhone
    }
}

export function completeJob(id: string, confirmationData: {
    recipientName: string
    itemsDelivered: string
    signature: string
}): void {
    const job = jobs.find((j) => j.id === id)
    if (job) {
        job.status = 'Completed'
        job.podRecipientName = confirmationData.recipientName
        job.signature = confirmationData.signature
        job.deliveredItems = {
            expected: job.items[0].description,
            delivered: confirmationData.itemsDelivered,
        }
    }
}

export function generatePodLink(job: Job): string {
    return `/job/${job.id}/confirm`
}

export function generateSmsMessage(
    driverName: string,
    items: string,
    address: string,
    podLink: string,
): string {
    return `Hi ${driverName}, you have a new delivery:
Items: ${items}
Address: ${address}
Please complete POD here: ${podLink}`
}
