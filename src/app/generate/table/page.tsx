import Link from 'next/link'
import React from 'react'
import Container from '@/shared/ui/Container'
import { PersonalityTable } from '@/entities/personality-table'
import styles from './page.module.scss'

export default function Page() {
  return (
    <Container>
      <div className={styles.head}>
        <h1 className={styles.title}>Генерация видероликов</h1>
        <div className={styles.btn}>
          <Link href={'/generate'}>Назад к генерации</Link>
        </div>
      </div>
      <PersonalityTable />
    </Container>
  )
}
