import { Handlers } from "$fresh/server.ts";
import { createJob } from "../../utils/jobStore.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const jobData = {
      senderName: form.get("senderName") as string,
      receiverName: form.get("receiverName") as string,
      address: form.get("address") as string,
      phone: form.get("phone") as string,
      consignmentNumber: form.get("consignmentNumber") as string,
      referenceNumber: form.get("referenceNumber") as string,
      items: form.get("items") as string,
    };

    const job = createJob(jobData);
    return new Response("", {
      status: 303,
      headers: { Location: `/job/${job.id}/contacts` },
    });
  },
};