import { randomBetween } from '@std/random/between'

export interface Item {
    readonly description: string
    readonly delivered: boolean
}

export function item(description: string) {
    return {
        description,
        delivered: false,
    }
}

// maybe job needs a sender and an origin contact to be separate

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

    readonly code: number
}

export interface Contact {
    readonly name: string
    readonly phone: string
    readonly email: string
}

export interface Location {
    readonly address: string
}

const senderPh = Deno.env.get('SENDER_PHONE') || '+4444444444'
const receiverPh = Deno.env.get('RECEIVER_PHONE') || '+8888888888'
const courierPh = Deno.env.get('COURIER_PHONE') || '+9999999999'

const sender = {
    name: 'ntr',
    phone: senderPh,
    email: 'ntr@podowl.north',
}

const receiver = {
    name: 'adri',
    phone: receiverPh,
    email: 'adri@bp.p',
}

const courier = {
    name: 'kotsi',
    phone: courierPh,
    email: 'kotsi@podowl.west',
}

const origin = {
    address: 'kitchen, your place, westside 0420',
}

const destination = {
    address: 'couch, your place, westside 0420',
}

const items = [
    item('hot tea'),
]

export function newJob(): Job {
    return {
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
        status: 'Waiting',

        sender,
        receiver,
        courier,

        origin,
        destination,
        items,
        code: Math.floor(randomBetween(1000, 10000)),
    }
}
