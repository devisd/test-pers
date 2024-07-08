import { EDIT_VIDEOS, READY_VIDEOS } from '@/shared/mock'
import Container from '@/shared/ui/Container'
import { ButtonAdd } from '@/features/button-add'
import { VideoList } from '@/features/video-list'
import styles from './page.module.scss'

export default function Home() {
  return (
    <Container>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Видеоролики</h1>
        <ButtonAdd />
      </div>
      <VideoList videosData={READY_VIDEOS} title="Готовые" isReady={true} />
      <VideoList videosData={EDIT_VIDEOS} title="Редактируемые" isReady={false} />
    </Container>
  )
}
