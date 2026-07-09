import { NextResponse } from 'next/server'
import { db } from '@/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json(null)

    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.authUserId, session.user.id as string)
    })

    return NextResponse.json(profile ?? null)
}