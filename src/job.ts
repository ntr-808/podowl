import { randomBetween } from '@std/random/between'

export interface Item {
    readonly description: string
    readonly collected: boolean
    readonly delivered: boolean
}

export function item(description: string): Item {
    return {
        description,
        collected: false,
        delivered: false,
    }
}

export interface Job {
    readonly id: string
    readonly created: Date
    readonly updated: Date
    readonly status: 'Waiting' | 'Transit' | 'Complete'
    readonly sender: Contact
    readonly courier: Contact
    readonly origin: Location
    readonly destination: Location
    readonly items: Item[]
    readonly consignment: string
    readonly code: number
    readonly signature?: string
    readonly recipientName?: string
}

export interface Contact {
    readonly name: string
    readonly phone: string
    readonly email: string
}

export interface Location {
    readonly address: string
    readonly contact: Contact
}

// Initialize Deno KV
const kv = await Deno.openKv()

export async function createJob(data: {
    originAddress: string
    originContactPhone: string
    originContactName: string
    destinationAddress: string
    destinationContactName: string
    destinationContactPhone: string

    consignmentNumber: string
    referenceNumber: string
    items: string
}): Promise<Job> {
    const job: Job = {
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
        status: 'Waiting',

        // receives the POD
        sender: {
            name: '',
            phone: '',
            email: '',
        },

        // picks up the thing
        courier: {
            name: '',
            phone: '',
            email: '',
        },

        // FIX FORMS TO FILL THESE DETAILS OUT

        origin: {
            address: data.originAddress,
            contact: {
                name: data.originContactName,
                phone: data.originContactPhone,
                email: '',
            },
        },
        destination: {
            address: data.destinationAddress,
            contact: {
                name: data.destinationContactName,
                phone: data.destinationContactPhone,
                email: '',
            },
        },
        items: data.items.trim().split('\n').filter((i) => i.trim()).map((
            item,
        ) => ({
            description: item.trim(),
            delivered: false,
            collected: false,
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

function getStatusOrder(status: string): number {
    switch (status) {
        case 'Waiting':
            return 0
        case 'Transit':
            return 1
        case 'Complete':
            return 2
        default:
            return 3
    }
}

function sortJobs(jobs: Job[]) {
    return jobs.sort((a, b) => {
        const statusOrder = getStatusOrder(a.status) - getStatusOrder(b.status)
        if (statusOrder !== 0) return statusOrder
        return b.updated.getTime() - a.updated.getTime()
    })
}

export async function getJobsByStatus(
    status: 'Waiting' | 'Transit' | 'Complete' | 'All',
): Promise<Job[]> {
    if (status === 'All') {
        return sortJobs(await getJobs())
    }

    const jobs: Job[] = []
    const entries = kv.list<Job>({ prefix: ['jobs_by_status', status] })

    for await (const entry of entries) {
        jobs.push(entry.value)
    }

    // Sort by status order and then by creation date (most recent first)
    return sortJobs(jobs)
}

export async function getJobById(id: string): Promise<Job | null> {
    const result = await kv.get<Job>(['jobs', id])
    return result.value
}

export async function updateJobContacts(id: string, contactData: {
    senderEmail: string
    senderPhone: string
    driverName: string
    driverPhone: string
    driverEmail: string
}) {
    const job = await getJobById(id)
    if (job) {
        const updatedJob: Job = {
            ...job,
            updated: new Date(),
            sender: {
                ...job.sender,
                phone: contactData.senderPhone,
                email: contactData.senderEmail,
            },
            courier: {
                ...job.courier,
                name: contactData.driverName,
                email: contactData.driverEmail,
                phone: contactData.driverPhone,
            },
        }

        // Update both the main job record and the status index
        await kv.set(['jobs', id], updatedJob)
        await kv.set(['jobs_by_status', updatedJob.status, id], updatedJob)
        return updatedJob
    }
}

export async function completeJob(id: string, confirmationData: {
    recipientName: string
    itemsDelivered: string[]
    signature: string
}) {
    const job = await getJobById(id)
    if (job) {
        // Remove the old status index
        await kv.delete(['jobs_by_status', job.status, id])

        const updatedJob: Job = {
            ...job,
            status: 'Complete',
            updated: new Date(),
            recipientName: confirmationData.recipientName,
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
        await kv.set(['jobs_by_status', 'Complete', id], updatedJob)
        return updatedJob
    }
}

export async function pickup(id: string, itemsDelivered: string[]) {
    const job = await getJobById(id)
    if (job) {
        // Remove the old status index
        await kv.delete(['jobs_by_status', 'Waiting', id])

        const updatedJob: Job = {
            ...job,
            updated: new Date(),
            status: 'Transit',
            items: job.items.map((item) => ({
                ...item,
                collected: itemsDelivered.includes(
                    item.description,
                ),
            })),
        }

        // Update both the main job record and the status index
        await kv.set(['jobs', id], updatedJob)
        await kv.set(['jobs_by_status', 'Transit', id], updatedJob)
        return updatedJob
    }
}
