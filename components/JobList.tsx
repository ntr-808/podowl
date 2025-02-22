import { JSX } from "preact";
import { Package, Plus } from "lucide-preact";
import { Job } from "../utils/jobStore.ts";

interface JobListProps {
  jobs: Job[];
  filter?: "All" | "Completed" | "Transit";
}

export function JobList({ jobs, filter = "All" }: JobListProps) {
  const filteredJobs = jobs.filter(job => 
    filter === "All" ? true : job.status === filter
  );

  return (
    <div class="max-w-lg mx-auto px-4 py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Jobs</h1>
        <a 
          href="/"
          class="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition-colors inline-flex"
          aria-label="Create new job"
        >
          <Plus class="h-6 w-6 text-white" />
        </a>
      </div>

      <div class="mb-6">
        <div class="flex space-x-4">
          {(["All", "Completed", "Transit"] as const).map((status) => (
            <a
              key={status}
              href={`/jobs?filter=${status}`}
              class={`px-4 py-1 rounded-full text-sm ${
                filter === status
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </a>
          ))}
        </div>
      </div>

      <div class="space-y-4">
        {filteredJobs.length === 0 ? (
          <div class="text-center py-8 text-gray-500">
            No jobs found. Click the + button to create a new job.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <a
              key={job.id}
              href={`/job/${job.id}`}
              class="block bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between mb-2">
                <span
                  class={`px-3 py-1 rounded-full text-sm ${
                    job.status === "Transit"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {job.status}
                </span>
                <Package class="h-12 w-12 text-gray-400" />
              </div>

              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">
                    {job.senderName} → {job.receiverName}
                  </span>
                </div>
                <div class="font-medium">#{job.id}</div>
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="h-1 bg-gray-200 rounded">
                      <div
                        class={`h-1 rounded ${
                          job.status === "Completed"
                            ? "bg-green-500 w-full"
                            : "bg-blue-500 w-2/3"
                        }`}
                      ></div>
                    </div>
                    <div class="flex justify-between mt-1">
                      <span class="text-sm text-gray-500">{job.origin}</span>
                      <span class="text-sm text-gray-500">
                        {job.destination}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-sm text-gray-500">{job.date}</div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}