import { NextResponse } from 'next/server'
import { db } from '@/db'
import { questions, profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'

export async function GET() {
    const session = await auth()
    if (!session?.user) return NextResponse.json([])

    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.authUserId, session.user.id as string)
    })
    if (!profile) return NextResponse.json([])

    const qs = await db.select().from(questions)
        .where(eq(questions.receiverId, profile.userId as string))
        .orderBy(questions.createdAt)
        .limit(10)

    return NextResponse.json(qs)
}