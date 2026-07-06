"use server";
import {db} from "@/db";
import {profiles} from "@/db/schema";
import {eq} from "drizzle-orm";
import {auth}  from "@/auth";

export async function updateFullName(full_name:string){
    const session=await auth();
    console.log("Session user id (updateFullName):", session?.user?.id);
    if(!session?.user?.id) throw new Error("Not authenticated");

    const result = await db
        .update(profiles)
        .set({fullName:full_name})
        .where(eq(profiles.authUserId, session.user.id))
        .returning();

    console.log("Updated rows (fullName):", result);
    }

    export async function updateLifestyle(hobby:string) {
    const session=await auth();
    console.log("Session user id (updateLifestyle):", session?.user?.id);
    if(!session?.user?.id) throw new Error("Not authenticated");

    const result=await db
        .update(profiles)
        .set({lifestyle:{hobby}})
        .where(eq(profiles.authUserId, session.user.id))
        .returning();

    console.log("Updated rows (lifestyle):", result);
}