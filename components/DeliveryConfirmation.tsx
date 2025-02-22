import { JSX } from 'preact'
import { ArrowLeft, HelpCircle, Link as LinkIcon, Package } from 'lucide-preact'
import { generatePodLink, Job } from '../src/job.ts'
import { OwlLogo } from './icons/OwlLogo.tsx'

interface DeliveryConfirmationProps {
    job: Job | null
}

export function DeliveryConfirmation({ job }: DeliveryConfirmationProps) {
    if (!job) {
        return (
            <div class='min-h-screen bg-secondary-950 flex items-center justify-center'>
                <div class='text-center'>
                    <OwlLogo class='h-12 w-12 text-primary-500 mx-auto mb-4' />
                    <h2 class='text-xl font-semibold text-secondary-100 mb-2'>
                        Job Not Found
                    </h2>
                    <p class='text-secondary-400'>
                        The delivery job you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        )
    }

    const podUrl = '/'

    return (
        <div class='max-w-lg mx-auto px-4 py-8'>
            <div class='bg-secondary-900 rounded-lg shadow-lg overflow-hidden border border-secondary-800'>
                <div class='p-4 border-b border-secondary-800'>
                    <div class='flex items-center justify-between mb-4'>
                        <a
                            href='/jobs'
                            class='p-1 rounded-full hover:bg-secondary-800 transition-colors'
                        >
                            <ArrowLeft class='h-5 w-5 text-secondary-400' />
                        </a>
                        <span class='px-3 py-1 bg-primary-900 text-primary-200 rounded-full text-sm font-medium'>
                            Transit
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
                                        <div class='h-1 bg-primary-500 w-2/3 rounded' />
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
                        <p class='text-sm font-medium text-secondary-400 mb-1'>
                            # of items
                        </p>
                        <p class='text-sm font-medium text-secondary-200'>
                            {job.items.length}
                        </p>
                    </div>

                    <div>
                        <p class='text-sm font-medium text-secondary-400 mb-1'>
                            Driver Link:
                        </p>
                        <div class='flex items-center space-x-2'>
                            <LinkIcon class='h-4 w-4 text-primary-500 flex-shrink-0' />
                            <a
                                href={podUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                class='text-xs text-primary-400 hover:text-primary-300 break-all'
                            >
                                {podUrl}
                            </a>
                        </div>
                    </div>

                    <div class='border-t border-secondary-800 pt-4 mt-4'>
                        <h3 class='text-lg font-medium text-secondary-100 mb-4'>
                            Delivery Confirmation
                        </h3>
                        <form method='POST' class='space-y-6'>
                            <div>
                                <label
                                    for='recipientName'
                                    class='block text-sm font-medium text-secondary-300 mb-2'
                                >
                                    Recipient Name
                                </label>
                                <input
                                    type='text'
                                    id='recipientName'
                                    name='recipientName'
                                    class='block w-full rounded-lg border border-secondary-700 bg-secondary-800 px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm text-secondary-100'
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    for='itemsDelivered'
                                    class='block text-sm font-medium text-secondary-300 mb-2'
                                >
                                    Items Delivered
                                </label>
                                <input
                                    type='text'
                                    id='itemsDelivered'
                                    name='itemsDelivered'
                                    value={job.items[0].description}
                                    class='block w-full rounded-lg border border-secondary-700 bg-secondary-800 px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm text-secondary-100'
                                    required
                                />
                            </div>

                            <div>
                                <label class='block text-sm font-medium text-secondary-300 mb-2'>
                                    Recipient Signature
                                </label>
                                <div class='border border-secondary-700 rounded-lg overflow-hidden'>
                                    {/* Signature pad will be handled as an island */}
                                    <div class='h-48 bg-secondary-800'></div>
                                </div>
                            </div>

                            <button
                                type='submit'
                                class='w-full py-3 px-4 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-lg'
                            >
                                Complete Delivery
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
