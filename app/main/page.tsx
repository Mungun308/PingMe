import {auth, signOut} from "@/auth";
import {redirect} from "next/navigation";
import { getMyProfile } from "@/app/actions/profile"
import styles from "./page.module.css";
import Link from "next/link";

export default async function Main(){
    const session=await auth();
    if(!session?.user) redirect("/");

    const profile = await getMyProfile()


    return(
        <main>
            <section className={styles.mainParent}>
                <div className={styles.button} id="profile">
                    <Link href="/users" className={styles.allProfiles}><p>All profiles</p></Link>
                </div>

                <div className={styles.button}>
                    <Link href="/questions" className={styles.allQuestions} id="question"><p>All questions</p></Link>
                </div>
                <div className={styles.button}>
                    
                    <Link href="/register" className={styles.registerButton} id="register">
                        {profile ? "Бүртгэлээ засах" : "Бүртгэл үүсгэх"}
                    </Link>
                </div>
                <div className={styles.button}> <p>Welcome to PingMe</p></div>
            </section>
        </main>
    )
}