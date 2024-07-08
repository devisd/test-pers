'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '@/shared/ui/Button'
import Container from '@/shared/ui/Container'
import { IconDeleteBlack } from '@/shared/ui/Icons'
import { FragmentsUpload } from '@/features/fragments-upload'
import styles from './page.module.scss'

export default function Page() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(true)
  const [itSave, setItSave] = useState(false)

  const handleClick = () => {
    isPending && router.push('/generate/')
  }

  return (
    <Container>
      <div className={styles.head}>
        <h1 className={styles.title}>Персонализация видеролика</h1>
        <div className={styles.btns}>
          <Link href={'/choice/'}>Назад</Link>
          <Button variant="white" disabled={!isPending} onClick={handleClick}>
            Сгенерировать
          </Button>
          <Button variant="white" onClick={() => setItSave(true)}>
            Сохранить
          </Button>
          <Button variant="white" className="px-2">
            <IconDeleteBlack />
          </Button>
        </div>
      </div>

      <FragmentsUpload isPending={setIsPending} itSave={itSave} />
    </Container>
  )
}
