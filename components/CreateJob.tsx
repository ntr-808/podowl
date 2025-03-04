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
                    value='ntr'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='tel'
                    name='originContactPhone'
                    placeholder='Origin Contact Phone #'
                    value='+61400111222'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='originAddress'
                    placeholder='Origin Address'
                    value='Westside Bakery, 11 Bread St, Yarraville'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />

                <input
                    type='text'
                    name='destinationContactName'
                    placeholder='Destination Contact Name'
                    value='kotsi'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='tel'
                    name='destinationContactPhone'
                    placeholder='Destination Contact Phone #'
                    value='+61499888777'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='destinationAddress'
                    placeholder='Destination Address'
                    value='Solid Sandwiches, 22 Butter Road, Newport'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='consignmentNumber'
                    value='RAD420'
                    placeholder='Consignment #'
                    required
                    class='w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-secondary-100 text-sm bg-secondary-800'
                />
                <input
                    type='text'
                    name='referenceNumber'
                    value='REFPLS'
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
                    {['Rye 3x', 'Wholegrain 2x', 'Multigrain 2x'].join('\n')}
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
