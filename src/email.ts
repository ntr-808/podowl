import sgMail from 'npm:@sendgrid/mail'
import { assert } from '$std/assert/assert.ts'

const sgKey = Deno.env.get('SENDGRID_API_KEY')
const podowlEmail = Deno.env.get('PODOWL_EMAIL')

assert(sgKey, 'SENDGRID_API_KEY not set')
assert(podowlEmail, 'PODOWL_EMAIL not set')

sgMail.setApiKey(sgKey)

import '$std/dotenv/load.ts'

export function onWaiting() {
    const msg = {
        to: 'ntr@strix.systems',
        from: podowlEmail,
        subject: `PODOWL - zzzz`,
        text: 'wow',
        html: 'wow',
    }

    return sgMail.send(msg)
}

const res = await onWaiting()
console.log(res)
