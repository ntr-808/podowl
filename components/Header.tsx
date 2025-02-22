import { JSX } from "preact";
import { ArrowLeft } from "lucide-preact";
import { OwlLogo } from "./icons/OwlLogo.tsx";

interface HeaderProps {
  path?: string;
}

export function Header({ path = "" }: HeaderProps) {
  const isJobList = path.includes("jobs");
  const isCreateJob = path === "/";

  return (
    <header class="bg-white">
      <div class="max-w-lg mx-auto px-4 py-4 flex items-center">
        {!isJobList && !isCreateJob && (
          <a
            href="/jobs"
            class="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back to jobs"
          >
            <ArrowLeft class="h-6 w-6 text-gray-600" />
          </a>
        )}
        {isCreateJob && (
          <div class="w-full text-center">
            <h1 class="text-lg font-medium text-gray-900">Create Job</h1>
          </div>
        )}
        {!isCreateJob && (
          <>
            <OwlLogo class="h-8 w-8 text-blue-600" />
            <h1 class="ml-2 text-xl font-semibold text-gray-900">PODOWL</h1>
          </>
        )}
      </div>
    </header>
  );
}