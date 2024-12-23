// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import twilio from 'npm:twilio'

Deno.serve(async (req) => {
  const { msg, phoneNumber } = await req.json()
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN")
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID")
  const messagingServiceSid = Deno.env.get("TWILIO_MESSAGING_SID")

  console.log(authToken)
  const client = twilio(accountSid, authToken);

  const res = await client.messages
      .create({
          body: msg,
          messagingServiceSid,
          to: phoneNumber,
      })

  console.log(res)

  return new Response(
    JSON.stringify(res),
    { headers: { "Content-Type": "application/json" } },
  )
})
