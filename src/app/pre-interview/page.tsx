'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '@/shared/lib/auth'
import Button from '@/shared/ui/Button'
import { IconArrowLeft } from '@/shared/ui/Icons'
import styles from './page.module.scss'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { login } = useAuth()
  const [currentMonth, setCurrentMonth] = useState(null)

  useEffect(() => {
    const date = new Date()
    const monthName = date
      .toLocaleString('ru-RU', { month: 'long' })
      .replace(/^./, (match) => match.toUpperCase())

    setCurrentMonth(monthName)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { name, email, phone, date: currentMonth }
    login(email, name, phone)
    localStorage.setItem('pres_user', JSON.stringify(data))
    router.push('/pre-interview/presentation')
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerHead}>
        <Link href={'/auth/'}>
          <IconArrowLeft />
        </Link>
        <h1>Укажите ваши данные</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
            required
          />
        </label>
        <label>
          Телефон:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
            placeholder="Введите номер телефона"
            required
          />
        </label>
        <label>
          Эл. почта:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите адрес электронной почты"
            required
          />
        </label>
        <Button variant="white" type="submit" className={styles.registerBtn}>
          Получить презентацию
        </Button>
      </form>
    </div>
  )
}
