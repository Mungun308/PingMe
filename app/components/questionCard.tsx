import React from "react";
import styles from './questionCard.module.css'
import Image from 'next/image';
import proPic from './proPic.svg'

type questionCardProps={
    receiver_id: string;
    context: string;
    asked_at:string;
    answer:string;
}

export default function QuestionCard({receiver_id, context, asked_at, answer}: questionCardProps){
    return(
        <div className={styles.questionCard}>
            
            <div className={styles.questionsWrapper}>
                <div className={styles.profileWrapper}>
                    <Image src={proPic} alt="propic"></Image>
                </div>      
                <div className={styles.questionBox}>
                    
                    <p id={styles.questionPrg}>{context}</p>
                </div>
                <div className={styles.answerBox}>
                    <p id="answerPrg">{answer}</p>
                </div>
            </div>
        </div>
    )
}