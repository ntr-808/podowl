import { Handlers, PageProps } from '$fresh/server.ts'
import { ArrowLeft } from 'lucide-preact'

interface ContactDetailsFormProps {
    onSubmit: (data: ContactFormData) => void
    jobData: {
        items: string
        address: string
        consignmentNumber: string
    }
}

export interface ContactFormData {
    senderEmail: string
    driverName: string
    driverPhone: string
}

export function ContactDetailsForm() {
    return (
        <div className='max-w-md mx-auto px-4'>
            <div className='flex items-center justify-between mb-6'>
                <button
                    className='p-2 rounded-full hover:bg-gray-400 transition-colors'
                    aria-label='Go back'
                >
                    <ArrowLeft className='h-5 w-5 text-gray-100' />
                </button>
                <h2 className='text-lg font-medium text-gray-100'>
                    Create Job
                </h2>
                <div className='w-8'></div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl font-semibold text-blue-600 mb-2'>
                    Add contact detail
                </h2>
                <p className='text-gray-100 text-sm leading-relaxed'>
                    Enter in your drivers mobile number and we'll SMS them a
                    link. Once the delivery is completed and POD is captured,
                    we'll email you the completed POD
                </p>
            </div>

            <form className='space-y-6'>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-100 mb-1'>
                            Where the POD will be emailed
                        </label>
                        <input
                            type='email'
                            name='senderEmail'
                            placeholder='Your Email'
                            defaultValue='ntr@podowl.com.au'
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm placeholder-gray-400'
                        />
                    </div>

                    <div className='pt-2'>
                        <label className='block text-sm font-medium text-gray-100 mb-1'>
                            Send Job link via SMS
                        </label>
                        <div className='space-y-4'>
                            <input
                                type='text'
                                name='driverName'
                                placeholder='Delivery Driver Name'
                                defaultValue='Jason Statham'
                                required
                                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm placeholder-gray-400'
                            />
                            <input
                                type='tel'
                                name='driverPhone'
                                placeholder='Delivery Driver Phone #'
                                defaultValue='+44444444444'
                                required
                                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm placeholder-gray-400'
                            />
                        </div>
                    </div>
                </div>

                <div className='flex items-center space-x-2 text-sm'>
                    <input
                        type='checkbox'
                        id='terms'
                        required
                        checked
                        className='h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
                    />
                    <label htmlFor='terms' className='text-gray-100'>
                        I Accept{' '}
                        <span className='text-blue-500'>
                            terms and conditions
                        </span>
                    </label>
                </div>

                <div className='flex space-x-4 pt-4'>
                    <button
                        type='button'
                        className='flex-1 py-3 px-6 bg-gray-400 text-gray-500 rounded-full font-medium hover:bg-gray-200 transition-colors'
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className='flex-1 py-3 px-6 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg'
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}
