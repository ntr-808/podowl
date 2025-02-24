import SignaturePad from '../islands/SignaturePad.tsx'
import { Signal, useSignal } from '@preact/signals'

interface DeliveryConfirmationSigProps {
    sig: Signal<string>
}

export default function DeliveryConfirmationSig(
    { sig }: DeliveryConfirmationSigProps,
) {
    return (
        <div>
            <label class='block text-sm font-medium text-secondary-300 mb-2'>
                Recipient Signature
            </label>
            <SignaturePad sig={sig} />
            <input
                type='hidden'
                name='signature'
                value={sig.value}
            />
        </div>
    )
}
