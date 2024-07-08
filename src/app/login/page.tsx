'use client'

import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '@/shared/lib/auth'
import Button from '@/shared/ui/Button'
import { IconArrowLeft } from '@/shared/ui/Icons'
import styles from './page.module.scss'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginHead}>
        <Link href={'/auth/'}>
          <IconArrowLeft />
        </Link>
        <h1>Вход</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
          />
        </label>
        <Button variant="white" type="submit" className={styles.loginBtn}>
          Войти
        </Button>
      </form>
    </div>
  )
}
