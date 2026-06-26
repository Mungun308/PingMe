import ProfileCard from '@/app/components/profileCard'
import '../globals.css';

export default async function UsersPage() {
    const res = await fetch('http://localhost:3000/api/users')
    const users = await res.json()

    return (
        <div className='profilesGrid' style={{margin: '1em', padding:'0', display:'flex', flexWrap:'wrap', gap:'var(--small)'}}>
        {users.map((user: any) => (
            <ProfileCard
            key={user.user_id}
            full_name={user.full_name}
            position={user.position}
            avatar_url={user.avatar_url}
            />
        ))}
        </div>
    )
}