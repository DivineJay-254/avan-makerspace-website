import type { NextRequest } from 'next/server'
import { listAdminResource } from '@/lib/firebase/admin-data'
import { requireAdminSession } from '@/lib/firebase/auth'
import { apiErrorResponse } from '@/lib/firebase/security'

function csvCell(value: unknown) {
  let text = String(value ?? '').replace(/[\r\n]+/g, ' ')
  if (/^[=+\-@]/.test(text)) text = `'${text}`
  return `"${text.replaceAll('"', '""')}"`
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminSession()
    const eventId = request.nextUrl.searchParams.get('eventId') ?? undefined
    const rows = await listAdminResource('registrations', { eventId })
    const columns = ['eventTitle', 'fullName', 'email', 'phone', 'participantCategory', 'organisation', 'additionalInformation', 'status', 'submittedAt']
    const csv = [columns.join(','), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(','))].join('\r\n')
    return new Response(`\uFEFF${csv}`, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="avan-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
