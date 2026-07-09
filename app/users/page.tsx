import ProfileCard from '@/app/components/profileCard'
import '../globals.css';
import style from "./page.module.css"

export default async function UsersPage() {
    const res = await fetch('http://localhost:3000/api/users')
    const user = await res.json()

    return (
        <div className={style.container}>
            <h2>Нийт бүртгүүлсэн хэрэглэгчид</h2>
            <div className='profilesGrid' style={{margin: '3em', paddingTop:'8em', display:'flex', flexWrap:'wrap', gap:'var(--small)', border:'none', borderRadius:'var(--mid)'}}>
            {user.map((user: any) => (
                <ProfileCard
                key={user.userId}
                id={user.userId}
                full_name={user.fullName}
                position={user.position}
                avatar_url={user.avatarUrl}
                />
            ))}
            </div>
        </div>
    )
}