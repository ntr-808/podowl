import { JSX } from "preact";
import { ArrowLeft } from "lucide-preact";

export function TermsAndConditions() {
  return (
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-2xl mx-auto px-4 py-8">
        <div class="flex items-center mb-6">
          <a
            href="/jobs"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft class="h-5 w-5 text-gray-600" />
          </a>
          <h1 class="text-2xl font-bold ml-2">Terms and Conditions</h1>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <section>
            <h2 class="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p class="text-gray-600">
              By using PODOWL's services, you agree to these terms and conditions. These terms govern your use of our proof of delivery capture and management system. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">2. Service Description</h2>
            <p class="text-gray-600">
              PODOWL provides digital proof of delivery services, including:
            </p>
            <ul class="list-disc ml-6 mt-2 text-gray-600 space-y-1">
              <li>Electronic signature capture</li>
              <li>Delivery confirmation and tracking</li>
              <li>Real-time delivery status updates</li>
              <li>Digital proof of delivery documentation</li>
              <li>Secure storage of delivery records</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <div class="space-y-3 text-gray-600">
              <p>Users must:</p>
              <ul class="list-disc ml-6 space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Ensure all captured signatures are authentic and authorized</li>
                <li>Maintain confidentiality of account credentials</li>
                <li>Report any unauthorized system access</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">4. Privacy Policy</h2>
            <div class="space-y-3 text-gray-600">
              <h3 class="font-medium text-gray-800 mt-4">4.1 Data Collection</h3>
              <p>We collect the following information:</p>
              <ul class="list-disc ml-6 space-y-1
  )
}