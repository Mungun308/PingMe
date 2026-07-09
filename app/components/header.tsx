'use client'
import styles from './header.module.css'
import Image from 'next/image'
import searchButton from './img/searchButton2.svg'
import notifButton from './img/notif-button.svg'
import proButton from './img/profile-button2.svg'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'


export function Header() {
    const router = useRouter()
    const { data: session } = useSession()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [showNotif, setShowNotif] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [notifications, setNotifications] = useState<any[]>([])
    const notifRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!searchQuery.trim()) {
        setSearchResults([])
        return
        }
        const timeout = setTimeout(async () => {
        const res = await fetch(`/api/users/search?q=${searchQuery}`)
        const data = await res.json()
        setSearchResults(data)
        }, 300)
        return () => clearTimeout(timeout)
    }, [searchQuery])

    useEffect(() => {
        if (!session?.user) return
        fetch("/api/notifications")
        .then(r => r.json())
        .then(setNotifications)
    }, [session])

    useEffect(() => {
        function handleClick(e: MouseEvent) {
        if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
            setShowNotif(false)
        }
        if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
            setShowProfile(false)
        }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <section className={styles.header}>

        <div className={styles.logoWrapper}
            onClick={() => router.push("/main")}
            style={{ cursor: "pointer" }}>
            <span className={styles.logoText}>PingMe</span>
        </div>

        <div className={styles.search}>
            <input
                type="search"
                placeholder="Хэрэглэгч хайх..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />
            <button className={styles.searchButton}>
                <Image src={searchButton} alt="srch" />
            </button>

            {searchResults.length > 0 && (
            <div className={styles.searchDropdown}>
                {searchResults.map((u: any) => (
                <div key={u.userId} className={styles.searchItem}
                    onClick={() => {
                    router.push(`/users/${u.userId}`)
                    setSearchQuery("")
                    setSearchResults([])
                    }}>
                    <span>{u.fullName}</span>
                    <span className={styles.searchPosition}>{u.position}</span>
                </div>
                ))}
            </div>
            )}
        </div>

        <div className={styles.headerButton}>

            <div ref={notifRef} className={styles.dropdownWrapper}>
            <button className={styles.profileButton}
                onClick={() => setShowNotif(v => !v)}>
                <Image src={notifButton} alt="ntf" />
                {notifications.length > 0 && (
                <span className={styles.badge}>{notifications.length}</span>
                )}
            </button>

            {showNotif && (
                <div className={styles.dropdown}>
                <h4 className={styles.dropdownTitle}>Мэдэгдэл</h4>
                {notifications.length === 0 ? (
                    <p className={styles.dropdownEmpty}>Мэдэгдэл байхгүй</p>
                ) : (
                    notifications.map((n: any) => (
                    <div key={n.questionId} className={styles.notifItem}
                        onClick={() => {
                        router.push(`/users/${n.receiverId}`)
                        setShowNotif(false)
                        }}>
                        <p className={styles.notifText}>{n.context}</p>
                        <span className={styles.notifTime}>
                        {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    ))
                )}
                </div>
            )}
            </div>

            <div ref={profileRef} className={styles.dropdownWrapper}>
            <button className={styles.profileButton}
                onClick={() => setShowProfile(v => !v)}>
                <Image src={proButton} alt="pro" />
            </button>

            {showProfile && (
                <div className={styles.dropdown}>
                {session?.user ? (
                    <>
                    <div className={styles.dropdownUser}>
                        <span>{session.user.name}</span>
                        <span className={styles.dropdownEmail}>{session.user.email}</span>
                    </div>
                    <button className={styles.dropdownItem}
                        onClick={async() => {
                        const res= await fetch("/api/my-profile")
                        const profile=await res.json()
                        router.push(`/users/${session.user?.id}`)
                        setShowProfile(false)
                        }}>
                        Профайл
                    </button>
                    <button className={styles.dropdownItem}
                        onClick={() => signOut({ callbackUrl: "/home" })}>
                        Гарах
                    </button>
                    </>
                ) : (
                    <button className={styles.dropdownItem}
                    onClick={() => router.push("/login")}>
                    Нэвтрэх
                    </button>
                )}
                </div>
            )}
            </div>

        </div>
        </section>
    )
}