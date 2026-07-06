"use client";
import { useState } from "react";
import { updateFullName, updateLifestyle } from "@/app/actions/profile";
import styles from './registerParent.module.css';

export default function RegisterForm() {
    const [tab, setTab] = useState<"general"|"lifestyle"|"education"|"personality">("general");
    const [fullName, setFullName] = useState("");
    const [hobby, setHobby] = useState("");

    return (
        <div>
        <button className={styles.button} onClick={() => setTab("general")}>Ерөнхий</button>
        <button className={styles.button} onClick={() => setTab("lifestyle")}>Амьдралын хэв маяг</button>
        <button className={styles.button} onClick={() => setTab("education")}>Боловсрол</button>
        <button className={styles.button} onClick={() => setTab("personality")}>Сонирхол</button>

        {tab==="general"&&(
            <div>
            <input
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                placeholder="Бүтэн нэр"
            />
            {/* <input 
                value={age}
                onChange={(e)=>setAge(e.target.value)}
                placeholder="Нас"
            /> */}
            <button onClick={()=>updateFullName(fullName)}>
                Хадгалах
            </button>
            </div>
        )}

        {tab==="lifestyle"&&(
            <div>
            <input
                value={hobby}
                onChange={(e)=>setHobby(e.target.value)}
                placeholder="Хобби"
            />
            <button onClick={()=>updateLifestyle(hobby)}>
                Хадгалах
            </button>
            </div>
        )}
        </div>
    );
}