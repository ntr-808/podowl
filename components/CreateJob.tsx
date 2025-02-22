import { Package } from 'lucide-preact'

export default function CreateJob() {
    return (
        <div className='max-w-md mx-auto px-4 py-6'>
            <div className='text-center mb-8'>
                <div className='flex justify-center mb-4'>
                    <div className='bg-blue-100 p-3 rounded-full'>
                        <Package className='h-8 w-8 text-blue-600' />
                    </div>
                </div>
                <h1 className='text-xl font-semibold text-gray-100 mb-1'>
                    Create Job
                </h1>
                <p className='text-sm text-gray-500'>
                    One time Proof of Delivery capture.
                    <br />
                    Never have a driver say no to getting a POD again
                </p>
            </div>

            <form
                className='space-y-5'
                method='POST'
                action='/job/create'
            >
                <input
                    type='text'
                    name='senderName'
                    placeholder='Sender Name'
                    defaultValue='ntr'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />
                <input
                    type='text'
                    name='receiverName'
                    placeholder='Receiver Name'
                    defaultValue='kotsi'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />
                <input
                    type='text'
                    name='address'
                    placeholder='Delivery Address'
                    defaultValue='102 Coronation St'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />

                <input
                    type='tel'
                    name='phone'
                    placeholder='Recipient Phone #'
                    defaultValue='+55555555555'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />
                <input
                    type='text'
                    name='consignmentNumber'
                    defaultValue='RAD420'
                    placeholder='Consignment #'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />
                <input
                    type='text'
                    name='referenceNumber'
                    defaultValue='REFPLS'
                    placeholder='Reference'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />
                <input
                    type='text'
                    name='items'
                    placeholder='Items'
                    defaultValue='cookbooks'
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 text-sm'
                />
                <button
                    type='submit'
                    className='flex-1 py-3 px-6 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg'
                >
                    NEXT
                </button>
            </form>
        </div>
    )
}
