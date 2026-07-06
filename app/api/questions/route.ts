import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
    try {
        const { rows } = await pool.query(
        `SELECT q.*, p.full_name, p.avatar_url, p.position
        FROM questions q
        JOIN profiles p ON q.receiver_id = p.user_id
        ORDER BY q.created_at DESC`
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { receiver_id, content } = body

        const { rows } = await pool.query(
        `INSERT INTO questions (receiver_id, content)
        VALUES ($1, $2)
        RETURNING *`,
        [receiver_id, content]
        )
        return NextResponse.json(rows[0], { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
    }
}