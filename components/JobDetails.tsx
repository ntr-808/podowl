import {
    ArrowLeft,
    HelpCircle,
    LinkIcon,
    MapPin,
    Package,
    Phone,
    Truck,
    User,
    Warehouse,
} from 'lucide-preact'
import { Job } from '../src/job.ts'
import { ProgressIndicator } from './ProgressIndicator.tsx'
import { StatusBadge } from './StatusBadge.tsx'

interface JobDetailsProps {
    job: Job
}

export function JobDetails({ job }: JobDetailsProps) {
    console.log(job)
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
                        <StatusBadge status={job.status} />
                        <button class='p-1 rounded-full hover:bg-secondary-800 transition-colors'>
                            <HelpCircle class='h-5 w-5 text-secondary-400' />
                        </button>
                    </div>

                    <div class='flex items-center space-x-3'>
                        <Package class='h-6 w-6 text-primary-500' />
                        <div>
                            <h2 class='text-lg font-semibold text-secondary-100'>
                                {job.consignment}
                            </h2>
                            <ProgressIndicator status={job.status} />
                        </div>
                    </div>
                </div>

                <div class='p-4 space-y-4'>
                    {/* Origin */}
                    <div>
                        <h3 class='text-sm font-medium text-secondary-400 mb-1'>
                            Origin
                        </h3>
                        <div class='bg-secondary-800 p-3 rounded-lg'>
                            <div class='flex items-center mb-2'>
                                <Warehouse class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.origin.address}
                                </p>
                            </div>
                            <div class='flex items-center mb-2'>
                                <User class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.origin.contact.name}
                                </p>
                            </div>
                            <div class='flex items-center'>
                                <Phone class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.origin.contact.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Courier */}
                    <div>
                        <h3 class='text-sm font-medium text-secondary-400 mb-1'>
                            Courier
                        </h3>
                        <div class='bg-secondary-800 p-3 rounded-lg'>
                            <div class='flex items-center mb-2'>
                                <Truck class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.courier.name || 'Not assigned'}
                                </p>
                            </div>
                            <div class='flex items-center'>
                                <Phone class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.courier.phone || 'Not assigned'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Destination Info */}
                    <div>
                        <h3 class='text-sm font-medium text-secondary-400 mb-1'>
                            Destination
                        </h3>
                        <div class='bg-secondary-800 p-3 rounded-lg'>
                            <div class='flex items-center mb-2'>
                                <MapPin class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.destination.address}
                                </p>
                            </div>
                            <div class='flex items-center mb-2'>
                                <User class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.destination.contact.name}
                                </p>
                            </div>
                            <div class='flex items-center'>
                                <Phone class='h-4 w-4 text-primary-500 mr-2' />
                                <p class='text-sm font-medium text-secondary-200'>
                                    {job.destination.contact.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class='grid grid-cols-2 gap-4'>
                        <div>
                            <p class='text-sm font-medium text-secondary-400'>
                                Updated
                            </p>
                            <p class='text-sm font-medium text-secondary-200'>
                                {job.updated.toLocaleString()}
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
                                    {job.status === 'Complete' && (
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

                    {job.status === 'Complete' && (
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
                                        {job.recipientName ||
                                            job.destination.contact.name}
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
