'use client'

import React, { useEffect, useRef, useState } from 'react'
import Button from '@/shared/ui/Button'
import { IconRoundPlus } from '@/shared/ui/Icons'
import { EditPopup } from '../../entities/edit-popup'
import styles from './ButtonAdd.module.scss'

export const ButtonAdd = () => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
  const [popupDefaults, setPopupDefaults] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  })
  const popupRef = useRef<HTMLDivElement | null>(null)

  const togglePopup = () => {
    setPopupDefaults({ title: 'Название видеоролика', description: 'Описание видеоролика' })
    setIsOpenPopup(!isOpenPopup)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpenPopup(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={popupRef}>
      <Button onClick={togglePopup} className={styles.button}>
        <span>Добавить</span>
        <IconRoundPlus />
      </Button>
      {isOpenPopup && <EditPopup isNew centered togglePopup={togglePopup} />}
    </div>
  )
}
