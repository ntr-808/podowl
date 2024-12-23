import React from 'react';
import { ArrowLeft, Package, HelpCircle, Link as LinkIcon } from 'lucide-react';
import { Job } from '../utils/jobStore';
import { generatePodLink } from '../utils/podUtils';

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  const handleBack = () => {
    window.location.search = 'jobs';
  };

  const podUrl = generatePodLink(job.consignmentNumber);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className={`px-3 py-1 rounded-full text-sm ${
              job.status === 'Transit' 
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {job.status}
            </span>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Delivery from: {job.senderName}</h2>
              <div className="flex items-center mt-1">
                <div className="w-full max-w-[200px]">
                  <div className="h-1 bg-gray-200 rounded">
                    <div className={`h-1 rounded ${
                      job.status === 'Completed'
                        ? 'bg-green-500 w-full'
                        : 'bg-blue-500 w-2/3'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Receiver Info</h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium">Receiver Name: {job.receiverName}</p>
              <p className="text-sm mt-1">Address: {job.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Consignment #</p>
              <p className="text-sm font-medium">{job.consignmentNumber}</p>
              {job.status === 'Transit' && (
                <div className="mt-2 flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  <a
                    href={podUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline break-all"
                  >
                    {podUrl}
                  </a>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reference #</p>
              <p className="text-sm font-medium">{job.referenceNumber}</p>
            </div>
          </div>

          {job.status === 'Completed' && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Delivered Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delivered</p>
                  <p className="text-sm font-medium">{job.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expected Items</p>
                  <p className="text-sm font-medium">{job.deliveredItems?.expected || job.items}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Items Delivered</p>
                  <p className="text-sm font-medium">{job.deliveredItems?.delivered}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Recipient Name</p>
                  <p className="text-sm font-medium">{job.podRecipientName || job.receiverName}</p>
                </div>
                {job.signature && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Recipient Signature</p>
                    <img 
                      src={job.signature} 
                      alt="Signature" 
                      className="max-w-[200px] border border-gray-200 rounded-lg"
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