"use client"
import { useState } from "react"

export default function SendQuestion({ receiverId }: { receiverId: string }) {
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
  }

  return (
    <div>
      {sent ? (
        <p>Асуулт амжилттай илгээгдлээ!</p>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Асуултаа бич..."
          />
          <button onClick={handleSend} disabled={!text.trim()}>
            Илгээх
          </button>
        </div>
      )}
    </div>
  )
}