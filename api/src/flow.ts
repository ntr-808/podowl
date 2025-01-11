import { item, Job } from './../types.ts'

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
    address: 'hay st',
}

const destination = {
    address: 'coro drive',
}

const items = [
    item('pinot gris'),
    item('silence'),
]

function newJob() {
    const job: Job = {
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
    }
}
