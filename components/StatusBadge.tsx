import { JSX } from 'preact'

interface StatusBadgeProps {
    status: 'Waiting' | 'Transit' | 'Completed'
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const styles = {
        Waiting: 'bg-yellow-900 text-yellow-200',
        Transit: 'bg-primary-900 text-primary-200',
        Completed: 'bg-tertiary-900 text-tertiary-200',
    }

    return (
        <span
            class={`px-3 py-1 rounded-full text-sm font-medium ${
                styles[status]
            }`}
        >
            {status}
        </span>
    )
}
