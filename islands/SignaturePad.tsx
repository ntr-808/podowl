import { useRef } from 'preact/hooks'
import SignatureCanvas from 'react-signature-canvas'
import type { Signal } from '@preact/signals'

interface SignaturePadProps {
    sig: Signal<string>
}

export default function SignaturePad({ sig }: SignaturePadProps) {
    const signatureRef = useRef<SignatureCanvas>(null)

    const handleClear = () => {
        if (signatureRef.current) {
            signatureRef.current.clear()
            sig.value = ''
        }
    }

    const handleSignatureEnd = () => {
        if (signatureRef.current) {
            sig.value = signatureRef.current.toDataURL()
        }
    }

    return (
        <div class='w-full'>
            <div class='bg-secondary-800 rounded-lg overflow-hidden'>
                <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                        className: 'w-full h-48',
                    }}
                    backgroundColor='rgb(30 41 59)' // tailwind bg-secondary-800
                    onEnd={handleSignatureEnd}
                />
            </div>
            <div class='mt-2 flex justify-end'>
                <button
                    type='button'
                    onClick={handleClear}
                    class='px-4 py-2 text-sm text-secondary-400 hover:text-secondary-300 transition-colors'
                >
                    Clear
                </button>
            </div>
        </div>
    )
}
