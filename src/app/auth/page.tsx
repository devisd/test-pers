import Image from 'next/image'
import Link from 'next/link'
import Logo from './logo.webp'
import styles from './page.module.scss'

export default function Page() {
  return (
    <div className={styles.auth}>
      <Image src={Logo} width={300} height={395} alt="logo" />
      <h1>Сервис персонализации рекламных видеороликов</h1>
      <div className={styles.link}>
        <Link href={'/login/'} className={styles.linkLogin}>
          Вход
        </Link>
        <Link href={'/pre-interview/'} className={styles.linkRegister}>
          Получить презентацию
        </Link>
      </div>
    </div>
  )
}
