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

interface PickupProps {
    job: Job
}

export function Pickup({ job }: PickupProps) {
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

                    <form method='POST' class='space-y-6'>
                        <div>
                            <label class='block text-sm font-medium text-secondary-300 mb-2'>
                                Items to Collect
                            </label>
                            <div class='space-y-3 bg-secondary-800 p-4 rounded-lg'>
                                {job.items.map((item, index) => (
                                    <div
                                        key={index}
                                        class='flex items-center'
                                    >
                                        <input
                                            type='checkbox'
                                            id={`item-${index}`}
                                            name={`deliveredItems[${index}]`}
                                            value={item.description}
                                            class='h-4 w-4 text-primary-500 border-secondary-600 rounded focus:ring-primary-500 focus:ring-offset-secondary-800'
                                        />
                                        <label
                                            for={`item-${index}`}
                                            class='ml-3 text-sm font-medium text-secondary-200'
                                        >
                                            {item.description}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div class='flex space-x-4 pt-4'>
                            <a
                                href='/jobs'
                                class='flex-1 py-3 px-6 bg-secondary-100 text-secondary-500 rounded-full font-medium hover:bg-secondary-200 transition-colors text-center'
                            >
                                Back
                            </a>
                            <button
                                type='submit'
                                class='flex-1 py-3 px-6 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-lg'
                            >
                                Confirm Pickup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
