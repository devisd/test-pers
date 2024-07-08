'use client'

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AuthProvider } from '@/shared/lib/auth'
import Button from '@/shared/ui/Button'
import { IconArrowRight } from '@/shared/ui/Icons'
import { SidebarNav } from '@/features/sidebar-nav'
import { Header } from '@/widgets/Header'
import '../shared/globals.scss'
import styles from './layout.module.scss'

const inter = Inter({ subsets: ['cyrillic'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  const hideUi =
    path.endsWith('/auth') ||
    path.endsWith('/login') ||
    path.endsWith('/pre-interview') ||
    path.endsWith('/presentation')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }
  const isClose = isSidebarOpen ? styles.close : ''
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          {!hideUi && (
            <>
              <header>
                <Header />
              </header>
              <aside className={`${styles.sidebar} ${isClose}`}>
                <Link href={'/'} className={styles.logo}>
                  <Image src="/logo.png" alt="logo" width={48} height={48} />
                </Link>
                <div className={styles.sidebarArrow}>
                  <Button onClick={toggleSidebar} className={!isSidebarOpen ? styles.rotate : ''}>
                    <IconArrowRight />
                  </Button>
                </div>
                <SidebarNav isOpen={isSidebarOpen} />
              </aside>
            </>
          )}

          <main className={hideUi ? '' : styles.main}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
