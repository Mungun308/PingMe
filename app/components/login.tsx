import Image from 'next/image';
import styles from './login.module.css'
import proPic from './img/proPic.svg'
import {signIn} from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Login(){
    
    return(
        <div className={styles.login}>
            <div className={styles.profileWrapper}>
                <Image src={proPic} alt="propic"></Image>
            </div>
            <button
                className="loginButton"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/main" })}
            >
                нэвтрэх
            </button>
        </div>
    )
}