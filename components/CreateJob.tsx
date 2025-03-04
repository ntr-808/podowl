import { Package } from 'lucide-preact'

export default function CreateJob() {
    return (
        <div class='max-w-md mx-auto px-4 py-6'>
            <div class='text-center mb-8'>
                <div class='flex justify-center mb-4'>
                    <div class='bg-primary-100 p-3 rounded-full'>
                        <Package class='h-8 w-8 text-primary-600' />
                    </div>
                </div>
                <h1 class='text-xl font-semibold text-secondary-100 mb-1'>
                    Create Job
                </h1>
                <p class='text-sm text-secondary-500'>
                    One time Proof of Delivery capture.
                    <br />
                    Never have a driver say no to getting a POD again
                </p>
            </div>

            <form class='space-y-5' method='POST' action='/job/create'>
                <input
                    type='text'
                    name='originContactName'
                    placeholder='Origin Contact Name'
                    
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='tel'
                    name='originContactPhone'
                    placeholder='Origin Contact Phone #'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='originAddress'
                    placeholder='Origin Address'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />

                <input
                    type='text'
                    name='destinationContactName'
                    placeholder='Destination Contact Name'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='tel'
                    name='destinationContactPhone'
                    placeholder='Destination Contact Phone #'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='destinationAddress'
                    placeholder='Destination Address'
                  
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='consignmentNumber'
                    
                    placeholder='Consignment #'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='referenceNumber'
                    
                    placeholder='Reference'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <textarea
                    name='items'
                    placeholder='Enter items (one per line)'
                    required
                    rows={4}
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800 resize-none'
                >
                    {['Coffee 3x', 'Cups 2x', 'Lids 2x'].join('\n')}
                </textarea>
                <button
                    type='submit'
                    class='flex-1 py-3 px-6 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-lg w-full'
                >
                    NEXT
                </button>
            </form>
        </div>
    )
}
