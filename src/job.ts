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
    readonly consignment: string
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

// Initialize Deno KV
const kv = await Deno.openKv()

export async function createJob(data: {
    senderName: string
    receiverName: string
    address: string
    phone: string
    consignmentNumber: string
    referenceNumber: string
    items: string
}): Promise<Job> {
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
        items: data.items.split('\n').map((item) => ({
            description: item.trim(),
            delivered: false,
        })),
        consignment: data.consignmentNumber,
        code: Math.floor(randomBetween(1000, 10000)),
    }

    // Store the job in KV
    await kv.set(['jobs', job.id], job)
    await kv.set(['jobs_by_status', job.status, job.id], job)

    return job
}

export async function getJobs(): Promise<Job[]> {
    const jobs: Job[] = []
    const entries = kv.list<Job>({ prefix: ['jobs'] })

    for await (const entry of entries) {
        jobs.push(entry.value)
    }

    return jobs
}

export async function getJobsByStatus(
    status: 'All' | 'Completed' | 'Transit',
): Promise<Job[]> {
    if (status === 'All') {
        return getJobs()
    }

    const jobs: Job[] = []
    const entries = kv.list<Job>({ prefix: ['jobs_by_status', status] })

    for await (const entry of entries) {
        jobs.push(entry.value)
    }

    return jobs
}

export async function getJobById(id: string): Promise<Job | null> {
    const result = await kv.get<Job>(['jobs', id])
    return result.value
}

export async function updateJobContacts(id: string, contactData: {
    senderEmail: string
    driverName: string
    driverPhone: string
}): Promise<void> {
    const job = await getJobById(id)
    if (job) {
        const updatedJob: Job = {
            ...job,
            updated: new Date(),
            sender: {
                ...job.sender,
                email: contactData.senderEmail,
            },
            courier: {
                ...job.courier,
                name: contactData.driverName,
                phone: contactData.driverPhone,
            },
        }

        // Update both the main job record and the status index
        await kv.set(['jobs', id], updatedJob)
        await kv.set(['jobs_by_status', updatedJob.status, id], updatedJob)
    }
}

export async function completeJob(id: string, confirmationData: {
    recipientName: string
    itemsDelivered: string[]
    signature: string
}): Promise<void> {
    const job = await getJobById(id)
    if (job) {
        // Remove the old status index
        await kv.delete(['jobs_by_status', job.status, id])

        const updatedJob: Job = {
            ...job,
            status: 'Completed',
            updated: new Date(),
            podRecipientName: confirmationData.recipientName,
            signature: confirmationData.signature,
            items: job.items.map((item) => ({
                ...item,
                delivered: confirmationData.itemsDelivered.includes(
                    item.description,
                ),
            })),
        }

        // Update both the main job record and add to the new status index
        await kv.set(['jobs', id], updatedJob)
        await kv.set(['jobs_by_status', 'Completed', id], updatedJob)
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
