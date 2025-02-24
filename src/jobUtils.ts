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
        consignment: 'RAD4206969',
    }
}

export async function onWaiting(job: Job) {
    const results = await Promise.all([
        Sms.sendSms(job.courier.phone, Sms.onWaitingCourier(job)),
        Sms.sendSms(job.sender.phone, Sms.onWaitingSender(job)),
        Sms.sendSms(job.receiver.phone, Sms.onWaitingReceiver(job)),
    ])

    console.log(results)
}

export async function onTransit(job: Job) {
    const results = await Promise.all([
        Sms.sendSms(job.courier.phone, Sms.onTransitCourier(job)),
        Sms.sendSms(job.sender.phone, Sms.onTransitSender(job)),
        Sms.sendSms(job.receiver.phone, Sms.onTransitReceiver(job)),
    ])

    console.log(results)
}

export async function onComplete(job: Job) {
    const results = await Promise.all([
        Sms.sendSms(job.sender.phone, Sms.onCompleteSender(job)),
        // Sms.sendSms(job.receiver.phone, Sms.onWaitingReceiver(job)),
        // Sms.sendSms(job.courier.phone, Sms.onWaitingCourier(job)),
    ])

    console.log(results)
}
