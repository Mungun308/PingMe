import { NextResponse } from 'next/server'
import { db } from '@/db'
import { profiles } from '@/db/schema'

export async function GET() {
    try {
        const allProfiles = await db.select().from(profiles)
        return NextResponse.json(allProfiles)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 })
  }
}


// export async function POST(){
//     try{
//         const {rows}= await db.query(
//             'INSERT INTO profiles (email, full_name, age, position, team, birth_date, education, lifestyle, personality) VALUES ( );'
//         )   
//         return NextResponse.json('Profile added successfully!') 
//     } catch (error){
//         return NextResponse.json(
//             { error: 'Failed to add profile'},
//             {status: 400 }
//         )
//     }
// }