import { Handlers, PageProps } from "$fresh/server.ts";
import { JobDetails } from "../../components/JobDetails.tsx";
import { Header } from "../../components/Header.tsx";
import { getJobById } from "../../utils/jobStore.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const id = ctx.params.id;
    const job = getJobById(id);
    if (!job) {
      return ctx.renderNotFound();
    }
    return ctx.render({ job });
  },
};

export default function JobPage(props: PageProps<{ job: Job }>) {
  const { job } = props.data;
  return (
    <>
      <Header path={props.url.pathname} />
      <JobDetails job={job} />
    </>
  );
}