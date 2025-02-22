import { JSX } from 'preact'
import { Package, Plus } from 'lucide-preact'
import { Job } from '../src/job.ts'

interface JobListProps {
    jobs: Job[]
    filter?: 'All' | 'Completed' | 'Transit'
}

export function JobList({ jobs, filter = 'All' }: JobListProps) {
    const filteredJobs = jobs.filter((job) =>
        filter === 'All' ? true : job.status === filter
    )

    return (
        <div class='max-w-lg mx-auto px-4 py-6'>
            <div class='flex justify-between items-center mb-6'>
                <h1 class='text-2xl font-bold text-secondary-100'>Jobs</h1>
                <a
                    href='/'
                    class='bg-primary-500 p-2 rounded-lg hover:bg-primary-600 transition-colors inline-flex'
                    aria-label='Create new job'
                >
                    <Plus class='h-6 w-6 text-white' />
                </a>
            </div>

            <div class='mb-6'>
                <div class='flex space-x-4'>
                    {(['All', 'Completed', 'Transit'] as const).map((
                        status,
                    ) => (
                        <a
                            key={status}
                            href={`/jobs?filter=${status}`}
                            class={`px-4 py-1 rounded-full text-sm ${
                                filter === status
                                    ? 'bg-primary-500 text-white'
                                    : 'text-secondary-400 hover:bg-secondary-800'
                            }`}
                        >
                            {status}
                        </a>
                    ))}
                </div>
            </div>

            <div class='space-y-4'>
                {filteredJobs.length === 0
                    ? (
                        <div class='text-center py-8 text-secondary-500'>
                            No jobs found. Click the + button to create a new
                            job.
                        </div>
                    )
                    : (
                        filteredJobs.map((job) => (
                            <a
                                key={job.id}
                                href={`/job/${job.id}`}
                                class='block bg-secondary-900 rounded-lg shadow-sm p-4 border border-secondary-800 hover:shadow-md transition-shadow'
                            >
                                <div class='flex items-center justify-between mb-2'>
                                    <span
                                        class={`px-3 py-1 rounded-full text-sm ${
                                            job.status === 'Transit'
                                                ? 'bg-primary-900 text-primary-200'
                                                : 'bg-tertiary-900 text-tertiary-200'
                                        }`}
                                    >
                                        {job.status}
                                    </span>
                                    <Package class='h-12 w-12 text-secondary-400' />
                                </div>

                                <div class='space-y-2'>
                                    <div class='flex items-center space-x-2'>
                                        <span class='text-sm text-secondary-400'>
                                            {job.sender.name} →{' '}
                                            {job.receiver.name}
                                        </span>
                                    </div>
                                    <div class='font-medium text-secondary-200'>
                                        #{job.id}
                                    </div>
                                    <div class='flex items-center justify-between'>
                                        <div class='flex-1'>
                                            <div class='h-1 bg-secondary-800 rounded'>
                                                <div
                                                    class={`h-1 rounded ${
                                                        job.status ===
                                                                'Completed'
                                                            ? 'bg-tertiary-500 w-full'
                                                            : 'bg-primary-500 w-2/3'
                                                    }`}
                                                >
                                                </div>
                                            </div>
                                            <div class='flex justify-between mt-1'>
                                                <span class='text-sm text-secondary-400'>
                                                    {job.origin.address}
                                                </span>
                                                <span class='text-sm text-secondary-400'>
                                                    {job.destination.address}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='text-sm text-secondary-400'>
                                        {job.created.toLocaleDateString()}
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
            </div>
        </div>
    )
}
