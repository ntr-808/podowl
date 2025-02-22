import { ArrowLeft } from 'lucide-preact'

export function ContactDetailsForm() {
    return (
        <div class='max-w-md mx-auto px-4'>
            <div class='flex items-center justify-between mb-6'>
                <a
                    href='/jobs'
                    class='p-2 rounded-full hover:bg-secondary-100 transition-colors'
                    aria-label='Go back'
                >
                    <ArrowLeft class='h-5 w-5 text-secondary-600' />
                </a>
                <h2 class='text-lg font-medium text-secondary-100'>
                    Create Job
                </h2>
                <div class='w-8'></div>
            </div>

            <div class='mb-8'>
                <h2 class='text-2xl font-semibold text-primary-600 mb-2'>
                    Add contact detail
                </h2>
                <p class='text-secondary-600 text-sm leading-relaxed'>
                    Enter in your drivers mobile number and we'll SMS them a
                    link. Once the delivery is completed and POD is captured,
                    we'll email you the completed POD
                </p>
            </div>

            <form method='POST' class='space-y-6'>
                <div class='space-y-4'>
                    <div>
                        <label class='block text-sm font-medium text-secondary-600 mb-1'>
                            Where the POD will be emailed
                        </label>
                        <input
                            type='email'
                            name='senderEmail'
                            placeholder='Your Email'
                            value='ntr@podowl.com.au'
                            required
                            class='w-full px-4 py-3 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm placeholder-secondary-400'
                        />
                    </div>

                    <div class='pt-2'>
                        <label class='block text-sm font-medium text-secondary-600 mb-1'>
                            Send Job link via SMS
                        </label>
                        <div class='space-y-4'>
                            <input
                                type='text'
                                name='driverName'
                                placeholder='Delivery Driver Name'
                                value='ice road trucker'
                                required
                                class='w-full px-4 py-3 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm placeholder-secondary-400'
                            />
                            <input
                                type='tel'
                                name='driverPhone'
                                placeholder='Delivery Driver Phone #'
                                value='0455666777'
                                required
                                class='w-full px-4 py-3 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm placeholder-secondary-400'
                            />
                        </div>
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
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}
