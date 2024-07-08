import Container from '@/shared/ui/Container'
import { UploadVideo } from '@/features/upload-video'
import styles from './page.module.scss'

export default function Page() {
  return (
    <Container>
      <h2 className={styles.title}>Добавление видеоролика</h2>
      <UploadVideo />
    </Container>
  )
}
