import { Package } from "lucide-preact";

export default function CreateJob() {
  return (
    <div class="max-w-md mx-auto px-4 py-6">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="bg-blue-100 p-3 rounded-full">
            <Package class="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 class="text-xl font-semibold text-gray-100 mb-1">Create Job</h1>
        <p class="text-sm text-gray-500">
          One time Proof of Delivery capture.
          <br />
          Never have a driver say no to getting a POD again
        </p>
      </div>

      <form class="space-y-5" method="POST" action="/job/create">
        <input
          type="text"
          name="senderName"
          placeholder="Sender Name"
          value="ntr"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <input
          type="text"
          name="receiverName"
          placeholder="Receiver Name"
          value="kotsi"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value="102 Coronation St"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Recipient Phone #"
          value="+55555555555"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <input
          type="text"
          name="consignmentNumber"
          value="RAD420"
          placeholder="Consignment #"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <input
          type="text"
          name="referenceNumber"
          value="REFPLS"
          placeholder="Reference"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <input
          type="text"
          name="items"
          placeholder="Items"
          value="cookbooks"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm"
        />
        <button
          type="submit"
          class="flex-1 py-3 px-6 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg w-full"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}