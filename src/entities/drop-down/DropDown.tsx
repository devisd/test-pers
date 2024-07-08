import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import cn from 'classnames'
import Button from '@/shared/ui/Button'
import { IconArrowUp, IconNote, IconUpBlack } from '@/shared/ui/Icons'
import styles from './DropDown.module.scss'

interface DropdownMenuProps {
  buttonText: string
  fragments: { id: number | string; name: string; time?: string }[]
  hasIcons?: boolean
  isWhite?: boolean
  onUpdate?: (name: string, value: string) => void // Adjust the type of 'value' as per your requirement
  className?: string
}

export const DropdownMenu = ({
  buttonText,
  fragments,
  hasIcons,
  isWhite,
  onUpdate,
  className,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false)
  const [generateName, setGenerateName] = useState(buttonText)
  const router = useRouter()
  const pathname = usePathname()

  const toggleMenu = () => {
    setOpen((prev) => !prev)
  }

  const handleClick = (name: string) => {
    setGenerateName(name)
    setOpen(false)
    if (onUpdate) {
      switch (buttonText) {
        case 'phone':
          onUpdate('phone', name)
          break
        case '№1 Имя':
          onUpdate('name1', name)
          break
        case '№2 Телефон':
          onUpdate('phone2', name)
          break
        case '№3 Время':
          onUpdate('time', name)
          break
        case '№4 Имя':
          onUpdate('name4', name)
          break
      }
    }
    {
      pathname === '/generate' && fragments[1].id === 'onPage' && router.push('/generate/table')
    }
  }

  const backgroundClass = isWhite ? '' : styles.transparentBackground

  return (
    <div className={cn(open ? styles.open : styles.menu, backgroundClass, className)}>
      <div className={styles.menuBtn} onClick={toggleMenu}>
        {generateName}
        <div className="rotate-180">{isWhite ? <IconUpBlack /> : <IconArrowUp />}</div>
      </div>
      {open && (
        <div className={`${styles.menuList} ${backgroundClass}`}>
          {fragments.map((el) => (
            <Button key={el.id} onClick={() => handleClick(el.name)}>
              {el.name} {hasIcons && <IconNote />}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
