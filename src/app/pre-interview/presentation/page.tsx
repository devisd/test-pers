'use client'

import { useEffect, useState } from 'react'
import { IconDownload, IconPerson } from '@/shared/ui/Icons'
import { Loader } from '@/shared/ui/Loader'
import styles from './page.module.scss'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <video
          width="560"
          height="315"
          src="https://storage.yandexcloud.net/persicomm/%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%BA%D0%B0_%D0%B4%D0%B5%D0%BD%D0%B8%D1%81.mp4"
          controls
          preload="auto"
        ></video>
      ) : (
        <div className={styles.loading}>
          <Loader className={styles.loadingCircle} />
          <span>Генерация видео...</span>
        </div>
      )}

      <div className={styles.btns}>
        <a
          href={
            'https://storage.yandexcloud.net/persicomm/%D0%9F%D0%B5%D1%80%D1%81%D0%B8%D0%BA%D0%BE%D0%BC.pdf'
          }
          className={styles.btnsDownload}
          target="_blank"
          rel="noreferrer"
        >
          <IconDownload />
          Скачать презентацию
        </a>
        <a href={'https://t.me/OKVSales'} target="_blank" rel="noreferrer" className={styles.btnsQuestion}>
          <IconPerson /> Задать вопрос
        </a>
      </div>
    </div>
  )
}
