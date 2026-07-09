import { NextResponse } from 'next/server'
import { db } from '@/db'
import { profiles } from '@/db/schema'
import { ilike } from 'drizzle-orm'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') ?? ''

    const results = await db.select().from(profiles)
        .where(ilike(profiles.fullName, `%${q}%`))
        .limit(5)

    return NextResponse.json(results)
}