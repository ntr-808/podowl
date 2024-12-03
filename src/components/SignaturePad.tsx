import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

export function SignaturePad({ onSave }: SignaturePadProps) {
  const signatureRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    signatureRef.current?.clear();
    onSave('');
  };

  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: 'w-full h-48',
          }}
          backgroundColor="white"
          onEnd={handleSignatureEnd}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Clear
        </button>
      </div>
    </div>
  );
}