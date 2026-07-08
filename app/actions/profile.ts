"use server"
import { db } from "@/db"
import { profiles } from "@/db/schema"
import { auth } from "@/auth"
import { eq } from "drizzle-orm"

export async function getMyProfile() {
    const session = await auth()
    if (!session?.user?.id) return null

    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.authUserId, session.user.id)
    })
    return profile ?? null
}

export async function upsertProfile(data: {
    fullName: string
    age: number
    position: string
    team: string
    birthDate: string
    education: object
    lifestyle: object
    personality: object
    }) {
    const session = await auth()
    if (!session?.user?.id) return

    const existing = await db.query.profiles.findFirst({
        where: eq(profiles.authUserId, session.user.id)
    })

    if (existing) {
        await db.update(profiles)
        .set({ ...data })
        .where(eq(profiles.authUserId, session.user.id))
    } else {
        await db.insert(profiles).values({
        authUserId: session.user.id,
        avatarUrl: session.user.image, 
        ...data,
        })
    }
}