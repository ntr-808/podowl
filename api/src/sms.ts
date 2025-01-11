import twilio from 'twilio'

const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
const messagingServiceSid = Deno.env.get('TWILIO_MESSAGING_SID')

// https://www.twilio.com/docs/conversations/quickstart

async function notifyReceiver(job: Job) {
    console.log(job)
}

Deno.serve(async (req) => {
    const { msg, phoneNumber } = await req.json()
    const client = twilio(accountSid, authToken)

    const res = await client.messages
        .create({
            body: msg,
            messagingServiceSid,
            to: phoneNumber,
        })

    console.log(res)

    return new Response(
        JSON.stringify(res),
        { headers: { 'Content-Type': 'application/json' } },
    )
})
