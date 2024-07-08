'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Button from '@/shared/ui/Button'
import { IconConnectors, IconHeart, IconHome, IconRoundPlus, IconArrowUp } from '@/shared/ui/Icons'
import { EditPopup } from '@/entities/edit-popup'
import styles from './SidebarNav.module.scss'

type Props = {
  isOpen: boolean
}

export const SidebarNav = ({ isOpen }: Props) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false)
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
  const [popupDefaults, setPopupDefaults] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  })
  const pathname = usePathname()
  const popupRef = useRef<HTMLDivElement | null>(null)

  const toggleMenuList = () => {
    setIsOpenList(!isOpenList)
  }

  const handleSupportClick = () => {
    const webTelegramURL = 'https://t.me/DenQu'
    window.open(webTelegramURL, '_blank')
  }

  const handleLinkClick = (link: string) => {
    window.location.href = link
  }

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
    <nav className={styles.sidebarNav}>
      <div className={styles.sidebarNavList}>
        <div className={`${styles.sidebarNavListItem} ${isOpen ? styles.isOpen : ''}`}>
          <section className={styles.section}>
            <div className={styles.wrap} onClick={toggleMenuList}>
              <IconHome />
              {!isOpen && (
                <div className={styles.wrapContent}>
                  <span>Видеоролики</span>
                  <div className={!isOpenList ? styles.reverse : ''}>
                    <IconArrowUp />
                  </div>
                </div>
              )}
            </div>
            {!isOpen && isOpenList && (
              <div className={styles.menu}>
                <div className={styles.menuConnectors}>
                  <IconConnectors />
                </div>
                <ul className={styles.menuTitles}>
                  <li className={styles.menuTitlesText}>
                    <div className={styles.menuTitlesTextPosition}>
                      <span>Новый проект</span>
                      <Button onClick={togglePopup}>
                        <IconRoundPlus />
                      </Button>
                      {isOpenPopup && (
                        <div ref={popupRef}>
                          <EditPopup
                            isNew
                            centered
                            title={popupDefaults.title}
                            description={popupDefaults.description}
                            togglePopup={togglePopup}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                  {['/', '/choice'].map((path, index) => (
                    <li
                      key={path}
                      onClick={() => handleLinkClick(path)}
                      className={pathname === path ? styles.menuTitlesBack : styles.menuTitlesTextPosition}
                    >
                      <a href={path}>{index === 0 ? 'Готовые' : 'Редактируемые'}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <div
          className={`${styles.sidebarNavListItem} ${isOpen ? styles.isOpen : ''}`}
          onClick={handleSupportClick}
        >
          <div className={styles.sidebarNavListItemSupport}>
            <IconHeart />
            {!isOpen && <p>Поддержка</p>}
          </div>
        </div>
      </div>
    </nav>
  )
}
