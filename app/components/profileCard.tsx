'use client';
import React from 'react';
import styles from './profileCard.module.css';
import Image from 'next/image';
import proPic from './img/proPic.svg';
import {useRouter} from 'next/navigation';

type ProfileCardProps={
    id: string;
    full_name: string;
    position: string;
    avatar_url: string; 
}

export default function ProfileCard({id, full_name, position, avatar_url}: ProfileCardProps) {
    const router=useRouter();
    return (
        <div className={styles.profileCard}>
            <p className={styles.newProfile}></p>
            <div className={styles.proPic}>
                
                <Image src={proPic} alt={full_name} width={64} height={64}/>
            </div>
            <div className='profileText'>
                <p className={styles.fullname}>{full_name} </p>
                <p className={styles.position}> {position} </p>
            </div>
            <button className={styles.viewButton}
            onClick={()=>router.push(`./users/${id}`)}
            > үзэх </button>
        </div>
    )
}

