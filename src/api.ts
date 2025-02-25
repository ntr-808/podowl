export function redirect(location: string, status: number = 303) {
    return new Response('', {
        status,
        headers: { Location: location },
    })
}
