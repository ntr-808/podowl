import React, { useState, useEffect } from 'react';
import { Package, Plus } from 'lucide-react';
import { Job, getJobs } from '../utils/jobStore';
import { JobDetails } from './JobDetails';

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Transit'>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  const filteredJobs = jobs.filter(job => 
    filter === 'All' ? true : job.status === filter
  );

  const handleCreateNew = () => {
    window.location.href = window.location.pathname;
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  if (selectedJob) {
    return <JobDetails job={selectedJob} />;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <button 
          onClick={handleCreateNew}
          className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition-colors"
          aria-label="Create new job"
        >
          <Plus className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          {(['All', 'Completed', 'Transit'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1 rounded-full text-sm ${
                filter === status
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No jobs found. Click the + button to create a new job.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job)}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    job.status === 'Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {job.status}
                </span>
                <Package className="h-12 w-12 text-gray-400" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {job.senderName} → {job.receiverName}
                  </span>
                </div>
                <div className="font-medium">#{job.id}</div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-1 bg-gray-200 rounded">
                      <div
                        className={`h-1 rounded ${
                          job.status === 'Completed'
                            ? 'bg-green-500 w-full'
                            : 'bg-blue-500 w-2/3'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">{job.origin}</span>
                      <span className="text-sm text-gray-500">
                        {job.destination}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{job.date}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}