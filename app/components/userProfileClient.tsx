"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import styles from "./userProfileClient.module.css"
import bdayIcon from "./img/bdayIcon.svg"
import professionIcon from "./img/professionIcon.svg"
import profession from "./img/profession.svg"
import mailIcon from "./img/mail.svg"
import teamIcon from "./img/teamIcon.svg"
import universityIcon from "./img/university.svg"
import editButton from "./img/editButton.svg"
import sport from "./img/sport.svg"
import talent from "./img/talent.svg"
import mbti from "./img/mbti.svg"
import zodiac from "./img/zodiac.svg"

export default function UserProfileClient({ profile, questions, isOwner, sessionImage }: {
    profile: any
    questions: any[]
    isOwner: boolean
    sessionImage: string
    }) {
    const [tab, setTab] = useState<"profile" | "questions">("profile")
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
        <div className={styles.header}>
            <span className={styles.headerItem}>{profile.fullName}</span>
            <span className={styles.headerItem}>{profile.age}</span>
            <span className={styles.headerItem}>{profile.position}</span>
            {isOwner && (
            <button className={styles.editButton}
                onClick={() => router.push("/register")}>
                <Image src={editButton} alt="eIcon"></Image>
            </button>
            )}
        </div>

        <div className={styles.contentRow}>
            <div className={styles.zuun}>
                <div className={styles.avatarCard}>
                    {profile.avatarUrl ? (
                    <Image src={profile.avatarUrl} alt="avatar"
                        width={100} height={100}
                        style={{ borderRadius: "12px" }} />
                    ):(
                    <div className={styles.avatarPlaceholder} />
                    )}
                </div>

                <div className={styles.tabs}>
                    <button
                    className={`${styles.tab} ${tab === "profile" ? styles.activeTab : ""}`}
                    onClick={() => setTab("profile")}>
                    Профайл
                    </button>
                    <button
                    className={`${styles.tab} ${tab === "questions" ? styles.activeTab : ""}`}
                    onClick={() => setTab("questions")}>
                    Асуулт
                    </button>
                </div>
            </div>

            <div className={styles.baruun}>
                {tab === "profile" && (
                    <div className={styles.profileTab}>

                    <div className={styles.card}>
                        <div className={styles.cardRow}>
                        <div className={styles.cardItem}>
                            <span className={styles.iconBox}>
                                <Image className={styles.cardIcon} src={zodiac} alt="zodiac"></Image>
                            </span>
                            <span className={styles.cardValue}>{(profile.personality as any)?.zodiac ?? "—"}</span>
                            <span className={styles.cardLabel}>Орд</span>
                        </div>
                        <div className={styles.cardItem}>
                            <span className={styles.iconBox}>
                                <Image className={styles.cardIcon} src={mbti} alt="mbti"></Image>
                            </span>
                            <span className={styles.cardValue}>{(profile.personality as any)?.mbti ?? "—"}</span>
                            <span className={styles.cardLabel}>MBTI</span>
                        </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardRow}>
                        <div className={styles.cardItem}>
                            <span className={styles.iconBox}>
                                <Image className={styles.cardIcon} src={sport} alt="sport"></Image>    
                            </span>
                            <span className={styles.cardLabel}>Хичээллэдэг спорт</span>
                            <span className={styles.cardValue}>{(profile.lifestyle as any)?.sports ?? "—"}</span>
                        </div>
                        <div className={styles.cardItem}>
                            <span className={styles.iconBox}> 
                                <Image className={styles.cardIcon} src={talent} alt="talent"></Image>
                            </span>
                            <span className={styles.cardLabel}>Урлагийн авьяас</span>
                            <span className={styles.cardValue}>{(profile.lifestyle as any)?.arts ?? "—"}</span>
                        </div>
                        </div>
                    </div>

                    <div className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <Image src={bdayIcon} alt="bday" width={20} height={20} />
                            : {profile.birthDate ?? "—"}
                        </div>
                        <div className={styles.sectionBody}>
                            <div className={styles.sectionBodyItem}>
                                <Image src={teamIcon} alt="tIcon"></Image>
                                : {profile.team ?? "—"}
                            </div>
                            <div className={styles.sectionBodyItem}>
                                <Image src={mailIcon} alt="mIcon"></Image>
                                : {profile.mail ?? "—"}
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <Image src={professionIcon} alt="picon"></Image>
                                : {(profile.education as any)?.major ?? "—"}
                        </div>
                        <div className={styles.sectionBody}>
                            <div className={styles.sectionBodyItem}>
                                <Image src={universityIcon} alt="uIcon"></Image>
                                : {(profile.education as any)?.university ?? "—"}
                            </div>
                            <div className={styles.sectionBodyItem}>
                                <Image src={profession} alt="pIcon"></Image>
                                : {(profile.education as any)?.degree ?? "—"}
                            </div>
                        </div>
                    </div>

                    </div>
                )}

                {tab === "questions" && (
                    <div>
                    {!isOwner && (
                        <SendQuestion receiverId={profile.userId} />
                    )}

                    <div className={styles.questionsGrid}>
                        {questions.map((q: any) => (
                        <div key={q.questionId} className={styles.questionCard}>
                            <p className={styles.questionText}>{q.context}</p>
                            {q.answer && <p className={styles.answerText}>{q.answer}</p>}
                        </div>
                        ))}
                    </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    )
    }

    function SendQuestion({ receiverId }: { receiverId: string }) {
    const [text, setText] = useState("")
    const [sent, setSent] = useState(false)

    const handleSend = async () => {
        await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId, content: text })
        })
        setText("")
        setSent(true)
        setTimeout(() => setSent(false), 2000)
    }

    return (
        <div className={styles.sendBox}>
        <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Асуултаа бич..." />
        <button onClick={handleSend} disabled={!text.trim()}>
            {sent ? "Илгээгдлээ!" : "Илгээх"}
        </button>
        </div>
    )
}