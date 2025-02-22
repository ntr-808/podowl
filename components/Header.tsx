import { JSX } from 'preact'
import { ArrowLeft } from 'lucide-preact'
import { OwlLogo } from './icons/OwlLogo.tsx'

interface HeaderProps {
    path?: string
}

export function Header({ path = '' }: HeaderProps) {
    const isJobList = path.includes('jobs')
    const isCreateJob = path === '/'

    return (
        <header class='bg-secondary-900 border-b border-secondary-800'>
            <div class='max-w-lg mx-auto px-4 py-4 flex items-center'>
                <a
                    href='/'
                    class='flex items-center hover:opacity-90 transition-opacity'
                    aria-label='Go to home page'
                >
                    <OwlLogo class='h-8 w-8 text-primary-500' />
                    <h1 class='ml-2 text-xl font-semibold text-secondary-100'>
                        PODOWL
                    </h1>
                </a>
            </div>
        </header>
    )
}
