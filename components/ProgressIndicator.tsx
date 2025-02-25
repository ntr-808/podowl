import { JSX } from 'preact'

interface ProgressIndicatorProps {
    status: 'Waiting' | 'Transit' | 'Completed'
}

export function ProgressIndicator({ status }: ProgressIndicatorProps) {
    const steps = ['Waiting', 'Transit', 'Completed']
    const currentStep = steps.indexOf(status) + 1
    const totalSteps = steps.length

    return (
        <div class='w-full mt-1'>
            <div class='flex items-center'>
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <>
                        <div
                            class={`w-2 h-2 rounded-full ${
                                index < currentStep
                                    ? 'bg-primary-500'
                                    : 'bg-secondary-800'
                            }`}
                        />
                        {index < totalSteps - 1 && (
                            <div
                                class={`flex-1 h-0.5 mx-1 ${
                                    index < currentStep - 1
                                        ? 'bg-primary-500'
                                        : 'bg-secondary-800'
                                }`}
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}
