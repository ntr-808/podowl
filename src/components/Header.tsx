import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { OwlLogo } from './icons/OwlLogo';

export function Header() {
  const isJobList = window.location.search.includes('jobs');
  const isCreateJob = !window.location.search;

  const handleBack = () => {
    window.location.search = 'jobs';
  };

  return (
    <header className="bg-white">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center">
        {!isJobList && !isCreateJob && (
          <button
            onClick={handleBack}
            className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back to jobs"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
        )}
        {isCreateJob && (
          <div className="w-full text-center">
            <h1 className="text-lg font-medium text-gray-900">Create Job</h1>
          </div>
        )}
        {!isCreateJob && (
          <>
            <OwlLogo className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">PODOWL</h1>
          </>
        )}
      </div>
    </header>
  );
}