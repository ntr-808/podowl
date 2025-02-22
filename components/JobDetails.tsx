import { JSX } from "preact";
import { ArrowLeft, Package, HelpCircle, Link as LinkIcon } from "lucide-preact";
import { Job } from "../utils/jobStore.ts";
import { generatePodLink } from "../utils/podUtils.ts";

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  const podUrl = generatePodLink(job.consignmentNumber);

  return (
    <div class="max-w-lg mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <a
              href="/jobs"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft class="h-5 w-5 text-gray-600" />
            </a>
            <span class={`px-3 py-1 rounded-full text-sm ${
              job.status === "Transit" 
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}>
              {job.status}
            </span>
            <button class="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <HelpCircle class="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div class="flex items-center space-x-3">
            <Package class="h-6 w-6 text-blue-600" />
            <div>
              <h2 class="text-lg font-semibold">Delivery from: {job.senderName}</h2>
              <div class="flex items-center mt-1">
                <div class="w-full max-w-[200px]">
                  <div class="h-1 bg-gray-200 rounded">
                    <div class={`h-1 rounded ${
                      job.status === "Completed"
                        ? "bg-green-500 w-full"
                        : "bg-blue-500 w-2/3"
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">Receiver Info</h3>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-sm font-medium">Receiver Name: {job.receiverName}</p>
              <p class="text-sm mt-1">Address: {job.address}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Consignment #</p>
              <p class="text-sm font-medium">{job.consignmentNumber}</p>
              {job.status === "Transit" && (
                <div class="mt-2 flex items-center space-x-2">
                  <LinkIcon class="h-4 w-4 text-blue-600" />
                  <a
                    href={podUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-blue-600 hover:underline break-all"
                  >
                    {podUrl}
                  </a>
                </div>
              )}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Reference #</p>
              <p class="text-sm font-medium">{job.referenceNumber}</p>
            </div>
          </div>

          {job.status === "Completed" && (
            <div class="border-t border-gray-200 pt-4 mt-4">
              <h3 class="text-sm font-medium text-gray-500 mb-3">Delivered Info</h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm font-medium text-gray-500">Delivered</p>
                  <p class="text-sm font-medium">{job.date}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Expected Items</p>
                  <p class="text-sm font-medium">{job.deliveredItems?.expected || job.items}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Items Delivered</p>
                  <p class="text-sm font-medium">{job.deliveredItems?.delivered}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Recipient Name</p>
                  <p class="text-sm font-medium">{job.podRecipientName || job.receiverName}</p>
                </div>
                {job.signature && (
                  <div>
                    <p class="text-sm font-medium text-gray-500 mb-2">Recipient Signature</p>
                    <img 
                      src={job.signature} 
                      alt="Signature" 
                      class="max-w-[200px] border border-gray-200 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}