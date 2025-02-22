import { RouteContext } from '$fresh/server.ts'
import { ContactDetailsForm } from '../../components/ContactDetailsForm.tsx'

export default function MyPage(req: Request, ctx: RouteContext) {
    return <ContactDetailsForm />
}
