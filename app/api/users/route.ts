import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
    try {
        const { rows } = await pool.query(
        'SELECT * FROM profiles ORDER BY created_at DESC'
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch profiles' },
            { status: 500 }
        )
    }

}

export async function POST(){
    try{
        const {rows}= await pool.query(
            'INSERT INTO profiles (email, full_name, age, position, team, birth_date, education, lifestyle, personality) VALUES ( );'
        )   
        return NextResponse.json('Profile added successfully!') 
    } catch (error){
        return NextResponse.json(
            { error: 'Failed to add profile'},
            {status: 400 }
        )
    }
}