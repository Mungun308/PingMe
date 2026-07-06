import {auth, signOut} from "@/auth";
import {redirect} from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Main(){
    const session=await auth();
    if(!session?.user) redirect("/");

    return(
        <main>
            <section className={styles.mainParent}>
                <div className={styles.profiles}>
                    
                    <Link href="/users" className={styles.allProfiles}>All profiles</Link>
                </div>
                <div className={styles.welcome}></div>

                <div className={styles.questions}>
                    <Link href="/questions" className={styles.allQuestions}>All questions</Link>
                </div>
                <div className={styles.register}>
                    
                    <Link href="/register" className={styles.registerButton}>Register your account</Link>
                </div>
                <div className={styles.quote2}></div>
            </section>
        </main>
    )
}