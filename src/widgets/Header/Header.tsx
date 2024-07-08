'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/shared/lib/auth'
import Button from '@/shared/ui/Button'
import Container from '@/shared/ui/Container'
import { IconNotification } from '@/shared/ui/Icons'
import styles from './Header.module.scss'
import Avatar from './avatar.webp'

export const Header = () => {
  const [active, setActive] = useState(false)
  const { logout } = useAuth()

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerBtns}>
            <IconNotification />
            <button
              type="button"
              onClick={() => setActive((prev) => !prev)}
              className={styles.headerBtnsAvatar}
            >
              <Image src={Avatar} alt="avatar" width={44} height={44} />
            </button>
          </div>
          {active && (
            <ul className={styles.headerMenu}>
              <li>
                <Link href={'/profile/'}>Личный кабинет</Link>
              </li>
              <li>
                <Button onClick={logout}>Выйти</Button>
              </li>
            </ul>
          )}
        </div>
      </Container>
    </div>
  )
}
