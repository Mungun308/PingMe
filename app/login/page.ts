"use client";
import { useEffect } from "react";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../components/login.module.css";
import proPic from "../components/img/proPic.svg";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(()=>{
        if (status === "authenticated") {
            router.push("/main");
        }
    }, [status,router]);

    if (status === "loading") return null;

    return React.createElement(
        "div",
        { className: styles.login },
        React.createElement(
            "div",
            { className: styles.profileWrapper },
            React.createElement(Image,{src: proPic, alt: "propic" })
        ),
        React.createElement(
            "div",
            {className: styles.Nerniiheseg}
            
        ),

        React.createElement(
            "button",
            {
                className: "loginButton",
                type: "button",
                onClick:()=>signIn("google", { callbackUrl: "/main" }),
            },
            "нэвтрэх"
        )
    );
}