import sgMail from "npm:@sendgrid/mail";
import { assert } from "$std/assert/assert.ts";
import { Job } from "./job.ts";

const sgKey = Deno.env.get("SENDGRID_API_KEY");
const podowlEmail = Deno.env.get("PODOWL_EMAIL");

// assert(sgKey, 'SENDGRID_API_KEY not set')
// assert(podowlEmail, 'PODOWL_EMAIL not set')

sgMail.setApiKey(sgKey);

export function onWaiting(job: Job) {
    const msg = {
        to: job.courier.email,
        from: podowlEmail,
        subject: `PODOWL - Job Awaiting Pickup`,
        text: `https://podowl.com.au/job/${job.id}/confirm`,
        html:
            `<a href="https://podowl.com.au/job/${job.id}/confirm">Click here to get job confirmation</a>`,
    };

    return sgMail.send(msg);
}

export function onComplete(job: Job) {
    const msg = {
        to: job.sender.email,
        from: podowlEmail,
        subject: `PODOWL - Job Complete`,
        text:
            `Delivery of ${job.consignment} has been completed.\nhttps://podowl.com.au/job/${job.id}/status`,
        html:
            `<a href="https://podowl.com.au/job/${job.id}/status">Delivery of ${job.consignment} has been completed.</a>`,
    };

    return sgMail.send(msg);
}
