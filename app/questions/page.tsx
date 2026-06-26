import '../globals.css';
import QuestionCard from '@/app/components/questionCard';


export default async function QuestionPage() {
    const res = await fetch('http://localhost:3000/api/questions')
    const users = await res.json()

    return (
        <div className='questionsGrid' style={{margin: '1em', padding:'0', display:'flex', flexWrap:'wrap', gap:'var(--small)'}}>
        {users.map((question: any) => (
            <QuestionCard
            key={question.question_id}
            receiver_id={question.receiver_id}
            context={question.context}
            answer={question.answer}
            asked_at={question.asked_at}
            />
        ))}
        </div>
    )
}