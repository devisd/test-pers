'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Button from '@/shared/ui/Button'
import Container from '@/shared/ui/Container'
import { IconDeleteBlack } from '@/shared/ui/Icons'
// import { VideoEditor } from '@/shared/ui/VideoEditor'
// import { VideoUploader } from '@/shared/ui/VideoUploader'
import { FragmentsChoice } from '@/features/fragments-choice'
import styles from './page.module.scss'

export default function Page() {
  const router = useRouter()
  const [fragments, setFragments] = useState(null)

  const handleNextPage = () => {
    fragments?.length ? router.push('/choice/upload/') : alert('Нужно добавить минимум один фрагмент')
  }

  return (
    <Container>
      <div className={styles.head}>
        <h1 className={styles.title}>Нарезка видеролика</h1>
        <div className={styles.btns}>
          <Link href={'/upload'}>Назад к загрузке</Link>
          <Button variant="white" onClick={handleNextPage}>
            Далее
          </Button>
          <Button variant="white" className="px-2">
            <IconDeleteBlack />
          </Button>
        </div>
      </div>
      <Suspense>
        <FragmentsChoice setFragments={setFragments} />
      </Suspense>
    </Container>
  )
}
