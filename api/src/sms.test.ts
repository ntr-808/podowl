// import { assert, assertEquals } from 'jsr:@std/assert'

import * as Sms from './sms.ts'
import { newJob } from './job.ts'

const job = newJob()

Deno.test('onWaitingReceiver', () => {
    const text = Sms.onWaitingReceiver(job)
    console.log(text)
})

Deno.test('onWaitingSender', () => {
    const text = Sms.onWaitingSender(job)
    console.log(text)
})

Deno.test('onWaitingCourier', () => {
    const text = Sms.onWaitingCourier(job)
    console.log(text)
})

Deno.test('onTransitReceiver', () => {
    const text = Sms.onTransitReceiver(job)
    console.log(text)
})

Deno.test('onTransitSender', () => {
    const text = Sms.onTransitSender(job)
    console.log(text)
})

Deno.test('onTransitCourier', () => {
    const text = Sms.onTransitCourier(job)
    console.log(text)
})

Deno.test('onCompleteReceiver', () => {
    const text = Sms.onCompleteReceiver(job)
    console.log(text)
})

Deno.test('onCompleteSender', () => {
    const text = Sms.onCompleteSender(job)
    console.log(text)
})

Deno.test('onCompleteCourier', () => {
    const text = Sms.onCompleteCourier(job)
    console.log(text)
})
