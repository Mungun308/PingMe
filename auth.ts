import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {db} from "@/db";
import {DrizzleAdapter} from "@auth/drizzle-adapter"

export const{handlers, auth, signIn, signOut}=NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [Google],
    callbacks:{
        async signIn({user,account,profile}){
            if(user.email?.endsWith("@gmail.com")){
                return true
            }
            return false
        },

        session({session,user}){
            session.user.id=user.id;
            return session;
        }
    }
})