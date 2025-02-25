import sgMail from 'npm:@sendgrid/mail'
import { Job } from './job.ts'
import { assert } from '$std/assert/assert.ts'

const sgKey = Deno.env.get('SENDGRID_API_KEY')
const podowlEmail = Deno.env.get('PODOWL_EMAIL')

assert(sgKey, 'SENDGRID_API_KEY not set')
assert(podowlEmail, 'PODOWL_EMAIL not set')

sgMail.setApiKey(sgKey)

export function onWaiting(job: Job) {
    const msg = {
        to: job.sender.email,
        from: podowlEmail,
        subject: `PODOWL - ${job.consignment}`,
        text: JSON.stringify(job),
        html: JSON.stringify(job),
    }

    return sgMail.send(msg)
}
