import { Handlers, PageProps } from "$fresh/server.ts";
import { JobList } from "../components/JobList.tsx";
import { Header } from "../components/Header.tsx";
import { getJobs } from "../utils/jobStore.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const filter = url.searchParams.get("filter") as "All" | "Completed" | "Transit" || "All";
    const jobs = getJobs();
    return ctx.render({ jobs, filter });
  },
};

export default function JobsPage(props: PageProps<{ jobs: Job[]; filter: string }>) {
  const { jobs, filter } = props.data;
  return (
    <>
      <Header path={props.url.pathname} />
      <JobList jobs={jobs} filter={filter} />
    </>
  );
}