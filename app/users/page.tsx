import ProfileCard from '@/app/components/profileCard'
import '../globals.css';

export default async function UsersPage() {
    const res = await fetch('http://localhost:3000/api/users')
    const user = await res.json()

    return (
        <div className='profilesGrid' style={{margin: '1em', padding:'0', display:'flex', flexWrap:'wrap', gap:'var(--small)'}}>
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
    )
}