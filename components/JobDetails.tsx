import { JSX } from 'preact'
import { ArrowLeft, HelpCircle, Link as LinkIcon, Package } from 'lucide-preact'
import { generatePodLink, Job } from '../src/job.ts'

interface JobDetailsProps {
    job: Job
}

export function JobDetails({ job }: JobDetailsProps) {
    return (
        <div class='max-w-lg mx-auto px-4 py-6'>
            <div class='bg-secondary-900 rounded-lg shadow-lg overflow-hidden border border-secondary-800'>
                <div class='p-4 border-b border-secondary-800'>
                    <div class='flex items-center justify-between mb-4'>
                        <a
                            href='/jobs'
                            class='p-1 rounded-full hover:bg-secondary-800 transition-colors'
                        >
                            <ArrowLeft class='h-5 w-5 text-secondary-400' />
                        </a>
                        <span
                            class={`px-3 py-1 rounded-full text-sm ${
                                job.status === 'Transit'
                                    ? 'bg-primary-900 text-primary-200'
                                    : 'bg-tertiary-900 text-tertiary-200'
                            }`}
                        >
                            {job.status}
                        </span>
                        <button class='p-1 rounded-full hover:bg-secondary-800 transition-colors'>
                            <HelpCircle class='h-5 w-5 text-secondary-400' />
                        </button>
                    </div>

                    <div class='flex items-center space-x-3'>
                        <Package class='h-6 w-6 text-primary-500' />
                        <div>
                            <h2 class='text-lg font-semibold text-secondary-100'>
                                Delivery from: {job.sender.name}
                            </h2>
                            <div class='flex items-center mt-1'>
                                <div class='w-full max-w-[200px]'>
                                    <div class='h-1 bg-secondary-800 rounded'>
                                        <div
                                            class={`h-1 rounded ${
                                                job.status === 'Completed'
                                                    ? 'bg-tertiary-500 w-full'
                                                    : 'bg-primary-500 w-2/3'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='p-4 space-y-4'>
                    <div>
                        <h3 class='text-sm font-medium text-secondary-400 mb-1'>
                            Receiver Info
                        </h3>
                        <div class='bg-secondary-800 p-3 rounded-lg'>
                            <p class='text-sm font-medium text-secondary-200'>
                                Receiver Name: {job.receiver.name}
                            </p>
                            <p class='text-sm mt-1 text-secondary-300'>
                                Address: {job.destination.address}
                            </p>
                        </div>
                    </div>

                    <div class='grid grid-cols-2 gap-4'>
                        <div>
                            <p class='text-sm font-medium text-secondary-400'>
                                Consignment #
                            </p>
                            <p class='text-sm font-medium text-secondary-200'>
                                {job.consignment}
                            </p>
                            {job.status === 'Transit' && (
                                <div class='mt-2 flex items-center space-x-2'>
                                    <LinkIcon class='h-4 w-4 text-primary-500' />
                                    <a
                                        href='confirm'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        class='text-xs text-primary-400 hover:text-primary-300 break-all'
                                    >
                                        Delivery Confirmation Page
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <p class='text-sm font-medium text-secondary-400'>
                                Code
                            </p>
                            <p class='text-sm font-medium text-secondary-200'>
                                {job.code}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 class='text-sm font-medium text-secondary-400 mb-2'>
                            Items
                        </h3>
                        <div class='bg-secondary-800 p-3 rounded-lg space-y-2'>
                            {job.items.map((item, index) => (
                                <div
                                    key={index}
                                    class='flex items-center justify-between'
                                >
                                    <span class='text-sm text-secondary-200'>
                                        {item.description}
                                    </span>
                                    {job.status === 'Completed' && (
                                        <span
                                            class={`text-sm px-2 py-1 rounded ${
                                                item.delivered
                                                    ? 'bg-tertiary-900 text-tertiary-200'
                                                    : 'bg-red-900 text-red-200'
                                            }`}
                                        >
                                            {item.delivered
                                                ? 'Delivered'
                                                : 'Not Delivered'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {job.status === 'Completed' && (
                        <div class='border-t border-secondary-800 pt-4 mt-4'>
                            <h3 class='text-sm font-medium text-secondary-400 mb-3'>
                                Delivered Info
                            </h3>
                            <div class='space-y-3'>
                                <div>
                                    <p class='text-sm font-medium text-secondary-400'>
                                        Delivered
                                    </p>
                                    <p class='text-sm font-medium text-secondary-200'>
                                        {job.updated.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p class='text-sm font-medium text-secondary-400'>
                                        Recipient Name
                                    </p>
                                    <p class='text-sm font-medium text-secondary-200'>
                                        {job.podRecipientName ||
                                            job.receiver.name}
                                    </p>
                                </div>
                                {job.signature && (
                                    <div>
                                        <p class='text-sm font-medium text-secondary-400 mb-2'>
                                            Recipient Signature
                                        </p>
                                        <img
                                            src={job.signature}
                                            alt='Signature'
                                            class='w-full border border-secondary-700 rounded-lg bg-secondary-800'
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
