import { PageProps } from "$fresh/server.ts";
import CreateJob from "../components/CreateJob.tsx";
import { Header } from "../components/Header.tsx";

export default function Home(props: PageProps) {
  return (
    <>
      <Header path={props.url.pathname} />
      <CreateJob />
    </>
  );
}