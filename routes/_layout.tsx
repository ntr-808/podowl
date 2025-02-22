import { PageProps } from '$fresh/server.ts'
import { Header } from '../components/Header.tsx'

export default function Layout({ Component, url }: PageProps) {
    return (
        <main>
            <Header path={url.pathname} />
            <Component />
        </main>
    )
}