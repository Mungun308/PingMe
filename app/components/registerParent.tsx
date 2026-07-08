"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {useSession} from "next-auth/react"
import { upsertProfile, getMyProfile } from "@/app/actions/profile"
import Image from "next/image"
import styles from "./registerParent.module.css"


export default function RegisterForm() {
    const router = useRouter()
    const {data: session}=useSession()
    const [tab, setTab] = useState<"general"|"education"|"lifestyle"|"personality">("general")
    const [isExisting, setIsExisting] = useState(false)
    const [form, setForm] = useState({
        fullName: "", age: "", position: "", team: "", birthDate: "",
        education: { major: "", university: "", degree: "" },
        lifestyle: { sports: "", arts: "" },
        personality: { zodiac: "", mbti: "", other_facts: "" },
    })

    useEffect(() => {
    async function loadProfile() {
        const profile = await getMyProfile()
        if (profile) {
            setIsExisting(true)
            setForm({
            fullName: profile.fullName ?? "",
            age: profile.age?.toString() ?? "",
            position: profile.position ?? "",
            team: profile.team ?? "",
            birthDate: profile.birthDate ?? "",
            education: (profile.education as any) ?? { major: "", university: "", degree: "" },
            lifestyle: (profile.lifestyle as any) ?? { sports: "", arts: "" },
            personality: (profile.personality as any) ?? { zodiac: "", mbti: "", other_facts: "" },
            })
        }
        }
        loadProfile()
    }, [])

    const handleSave = async () => {
        await upsertProfile({
        fullName: form.fullName,
        age: Number(form.age),
        position: form.position,
        team: form.team,
        birthDate: form.birthDate,
        education: form.education,
        lifestyle: form.lifestyle,
        personality: form.personality,
        })
        const profile=await getMyProfile()
        router.push(`/users/${profile?.userId}`)
    }

return (
    <div className={styles.body}>
        <div className={styles.container}>

            <div className={styles.tabButtons}>
                <h2>{isExisting ? "Бүртгэл засах" : "Бүртгэл үүсгэх"}</h2>

                <div className={styles.profileWrapper}>
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt="profile"
                        width={140}
                        height={140}
                        loading="eager"
                        style={{ borderRadius: "50%" }}
                    />
                    ) : (
                    <div style={{
                        width: 140, height: 140, borderRadius: "50%",
                        backgroundColor: "#ddd", border: "2px solid black"
                    }} />
                    )}
            </div>

                {(["general","education","lifestyle","personality"] as const).map(t => (
                <button className={styles.tabButton} key={t} onClick={() => setTab(t)}
                    style={{ fontWeight: tab === t ? "styles.activeTab" : "normal" }}>
                    {t === "general" ? "Ерөнхий" :
                    t === "education" ? "Боловсрол" :
                    t === "lifestyle" ? "Ур чадвар" : "Сонирхол"}
                </button>
                ))}
            </div>

            
            {tab==="general"&&(
                <div className={styles.generalTab}>
                    <div>
                        <label>Бүтэн нэр</label>
                        <input placeholder="Бүтэн нэрээ оруулна уу" value={form.fullName}
                            onChange={e => setForm({...form, fullName: e.target.value})} />
                    </div>
                    <div>
                        <label>Нас</label>
                        <input placeholder="Насаа оруулна уу" value={form.age}
                            onChange={e => setForm({...form, age: e.target.value})} />
                    </div>
                    <div>
                        <label>Албан тушаал</label>
                        <input placeholder="Албан тушаалаа оруулна уу" value={form.position}
                            onChange={e => setForm({...form, position: e.target.value})} />
                    </div>
                    <div>
                        <label>Баг</label>
                        <input placeholder="Багаа оруулна уу" value={form.team}
                            onChange={e => setForm({...form, team: e.target.value})} />
                    </div>
                    <div>
                        <label>Төрсөн өдөр</label>
                        <input type="date" value={form.birthDate}
                            onChange={e => setForm({...form, birthDate: e.target.value})} />
                    </div>
                </div>
            )}

            {tab==="education"&&(
                <div className={styles.generalTab}>
                    <div>
                        <label>Мэргэжил</label>
                        <input placeholder="Мэргэжилээ оруулна уу" value={form.education.major}
                            onChange={e => setForm({...form, education: {...form.education, major: e.target.value}})} />
                    </div>
                    <div>
                        <label>Сургууль</label>
                        <input placeholder="Сургуулиа оруулна уу" value={form.education.university}
                            onChange={e => setForm({...form, education: {...form.education, university: e.target.value}})} />
                    </div>
                    <div>
                        <label>Боловсролын зэрэг</label>
                        <select value={form.education.degree}
                            onChange={e => setForm({...form, education: {...form.education, degree: e.target.value}})}>
                            <option value="">Зэрэг сонгох</option>
                            <option>Бакалавр</option>
                            <option>Магистр</option>
                            <option>Доктор</option>
                        </select>
                    </div>
                </div>
            )}

            {tab==="lifestyle"&&(
                <div className={styles.generalTab}>
                    <div>
                        <label>Хичээллэдэг спорт</label>
                        <input placeholder="Спортоо оруулна уу" value={form.lifestyle.sports}
                            onChange={e => setForm({...form, lifestyle: {...form.lifestyle, sports: e.target.value}})} />
                    </div>
                    <div>
                        <label>Урлагийн авьяас</label>
                        <input placeholder="Урлагийн авьяасаа оруулна уу" value={form.lifestyle.arts}
                            onChange={e => setForm({...form, lifestyle: {...form.lifestyle, arts: e.target.value}})} />
                    </div>
                    {/* <div>
                        <label>Дуртай артист</label>
                        <input placeholder="Дуртай хамтлаг, дуучин..." value={form.lifestyle.other_facts}
                            onChange={e => setForm({...form, lifestyle: {...form.lifestyle, other_facts: e.target.value}})} />
                    </div> */}
                </div>
            
            )}

            {tab==="personality"&&(
                <div className={styles.generalTab}>
                    <div>
                        <label>Орд</label>
                        <input placeholder="Ордоо оруулна уу" value={form.personality.zodiac}
                            onChange={e => setForm({...form, personality: {...form.personality, zodiac: e.target.value}})} />
                    </div>
                    <div>
                        <label>MBTI</label>
                        <input placeholder="MBTI-гаа оруулна уу" value={form.personality.mbti}
                            onChange={e => setForm({...form, personality: {...form.personality, mbti: e.target.value}})} />
                    </div>
                    <div>
                        <label>Бусад</label>
                        <input placeholder="Бусад мэдээлэл оруулна уу" value={form.personality.other_facts}
                            onChange={e => setForm({...form, personality: {...form.personality, other_facts: e.target.value}})} />
                    </div>


                </div>
            )}
            
            </div>
            <button className={styles.saveButton} onClick={handleSave}>Хадгалах</button>

        </div>   
        )
}