import { JSX } from "preact";
import { ArrowLeft, Package, HelpCircle, Link as LinkIcon } from "lucide-preact";
import { Job } from "../utils/jobStore.ts";
import { OwlLogo } from "./icons/OwlLogo.tsx";
import { generatePodLink } from "../utils/podUtils.ts";

interface DeliveryConfirmationProps {
  job: Job | null;
}

export function DeliveryConfirmation({ job }: DeliveryConfirmationProps) {
  if (!job) {
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <OwlLogo class="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p class="text-gray-600">The delivery job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const podUrl = generatePodLink(job.consignmentNumber);

  return (
    <div class="max-w-lg mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <a
              href="/jobs"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft class="h-5 w-5 text-gray-600" />
            </a>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Transit
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
                    <div class="h-1 bg-blue-500 w-2/3 rounded" />
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
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Reference #</p>
              <p class="text-sm font-medium">{job.referenceNumber}</p>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500 mb-1"># of items</p>
            <p class="text-sm font-medium">1</p>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Driver Link:</p>
            <div class="flex items-center space-x-2">
              <LinkIcon class="h-4 w-4 text-blue-600 flex-shrink-0" />
              <a
                href={podUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-blue-600 hover:underline break-all"
              >
                {podUrl}
              </a>
            </div>
          </div>

          <div class="border-t-2 border-gray-200 pt-4 mt-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Delivery Confirmation</h3>
            <form method="POST" class="space-y-6">
              <div>
                <label for="recipientName" class="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label for="itemsDelivered" class="block text-sm font-medium text-gray-700 mb-2">
                  Items Delivered
                </label>
                <input
                  type="text"
                  id="itemsDelivered"
                  name="itemsDelivered"
                  value={job.items}
                  class="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Signature
                </label>
                <div class="border-2 border-gray-300 rounded-lg overflow-hidden">
                  {/* Signature pad will be handled as an island */}
                  <div class="h-48 bg-white"></div>
                </div>
              </div>

              <button
                type="submit"
                class="w-full py-3 px-4 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg"
              >
                Complete Delivery
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}