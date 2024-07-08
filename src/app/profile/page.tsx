import Image from 'next/image'
import React from 'react'
import Container from '@/shared/ui/Container'
import Gear from './gears.webp'
import styles from './page.module.scss'

export default function Page() {
  return (
    <Container>
      <h1 className={styles.title}>Личный кабинет</h1>
      <div className={styles.profile}>
        <Image src={Gear} width={800} height={654} alt="logo" />
      </div>
    </Container>
  )
}
