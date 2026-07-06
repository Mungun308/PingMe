'use client';
import styles from './header.module.css'
import Image from 'next/image';
import searchButton from './img/searchButton2.svg';
import notifButton from './img/notif-button.svg';
import proButton from './img/profile-button2.svg'
import pingmeLogo from './img/pingme-logo.svg'
import React from 'react'
import { useRouter } from 'next/navigation';

export function Header(){
    const router=useRouter();
    return(
        <section className={styles.header}>
            <div className={styles['logo-wrapper']}>
            </div>
                <div className={styles.search}>
                    <input type="search"></input>
                    <button className={styles['search-button']}>
                        <Image src={searchButton} alt="srch"></Image>
                    </button>
                </div>
            <div className={styles['header-button']}>
                <button className={styles['profile-button']}>
                    <Image src={notifButton} alt="ntf"
                    onClick={()=>router.push('/notif')}
                    ></Image>
                </button>
                <button className={styles['profile-button']}>
                    <Image src={proButton} alt="pro"
                    onClick={()=>router.push('/login')}></Image>
                </button>
            </div>
        </section>
    )
}