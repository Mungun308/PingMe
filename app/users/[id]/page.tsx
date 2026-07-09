import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { profiles, questions } from "@/db/schema"
import { eq } from "drizzle-orm"
import UserProfileClient from "@/app/components/userProfileClient"

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const {id}=await params
  const session = await auth()
  if (!session?.user) redirect("/")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, id)
  })
  if (!profile) return <div>Профайл олдсонгүй</div>

  const qs = await db.select().from(questions)
    .where(eq(questions.receiverId, id))

  const isOwner = profile.authUserId === session.user.id

  return (
    <UserProfileClient
      profile={profile}
      questions={qs}
      isOwner={isOwner}
      sessionImage={session.user.image ?? ""}
    />
  )
}