import { PageProps } from '$fresh/server.ts'
import { Header } from '../components/Header.tsx'

export default function Home({ Component }: PageProps) {
    return (
        <main>
            <Header />
            <Component />
        </main>
    )
}
