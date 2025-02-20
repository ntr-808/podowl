import { OwlLogo } from './OwlLogo.tsx'

export function Header() {
    return (
        <header className=''>
            <OwlLogo className='h-8 w-8 text-blue-600' />
            <h1 className='ml-2 text-xl font-semibold text-gray-100'>PODOWL</h1>
        </header>
    )
}
