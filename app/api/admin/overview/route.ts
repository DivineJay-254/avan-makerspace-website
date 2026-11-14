import { getAdminOverview } from '@/lib/firebase/admin-data'
import { requireAdminSession } from '@/lib/firebase/auth'
import { apiErrorResponse } from '@/lib/firebase/security'

export async function GET() {
  try {
    await requireAdminSession()
    return Response.json(await getAdminOverview())
  } catch (error) {
    return apiErrorResponse(error)
  }
}
