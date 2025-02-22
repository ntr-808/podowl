import { Handlers, PageProps } from "$fresh/server.ts";
import { DeliveryConfirmation } from "../../../components/DeliveryConfirmation.tsx";
import { Header } from "../../../components/Header.tsx";
import { getJobById, completeJob } from "../../../utils/jobStore.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const id = ctx.params.id;
    const job = getJobById(id);
    if (!job) {
      return ctx.renderNotFound();
    }
    return ctx.render({ job });
  },
  async POST(req, ctx) {
    const id = ctx.params.id;
    const form = await req.formData();
    const confirmationData = {
      recipientName: form.get("recipientName") as string,
      itemsDelivered: form.get("itemsDelivered") as string,
      signature: form.get("signature") as string,
    };

    await completeJob(id, confirmationData);
    return new Response("", {
      status: 303,
      headers: { Location: `/job/${id}` },
    });
  },
};

export default function JobConfirmPage(props: PageProps<{ job: Job }>) {
  const { job } = props.data;
  return (
    <>
      <Header path={props.url.pathname} />
      <DeliveryConfirmation job={job} />
    </>
  );
}