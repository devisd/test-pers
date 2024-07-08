'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import Button from '@/shared/ui/Button'
import {
  IconDelete,
  IconFragment,
  IconFragmentBlack,
  IconPlus,
  IconRoundPlus,
  IconRoundPlusBlack,
} from '@/shared/ui/Icons'
import styles from './UploadVideo.module.scss'

interface FileWithOrder {
  file: File
  order: number
  id: string
}

export const UploadVideo = () => {
  const videoPicker = useRef<HTMLInputElement | null>(null)
  const [videos, setVideos] = useState([])
  const [selectedFile, setSelectedFile] = useState<FileWithOrder[]>([])
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isFragmentVideo, setIsFragmentVideo] = useState<boolean>(false)
  const [currentFile, setCurrentFile] = useState<FileWithOrder | null>(null)

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = Array.from(e.target.files)
    const files = Array.from(e.target.files as FileList).map((file, index) => ({
      file,
      order: selectedFile.length + index,
      id: URL.createObjectURL(file),
    }))
    setSelectedFile(isFragmentVideo ? [...selectedFile, ...files] : files)
    setVideos(vid)
  }

  const handlePick = async () => {
    videoPicker.current?.click()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files as FileList).map((file, index) => ({
      file,
      order: selectedFile.length + index,
      id: URL.createObjectURL(file),
    }))

    if (!isFragmentVideo && files.length > 1) {
      alert('Вы можете загрузить только одно видео в режиме "Целиком".')
      return
    }

    setSelectedFile(isFragmentVideo ? [...selectedFile, ...files] : files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFragmentClick = () => {
    setIsFragmentVideo(true)
    setSelectedFile([])
  }

  const handleCompletelyClick = () => {
    setIsFragmentVideo(false)
    setSelectedFile([])
  }

  const handleUpload = () => {
    if (videos.length > 0) {
      videos.length === 1 && router.push('/choice?video=1')
      videos.length >= 2 && router.push(`/choice?fragments=${videos.length}`)
      // const videoURLs = videos.map((video) => URL.createObjectURL(video))
      // router.push(`/choice?videos=${encodeURIComponent(JSON.stringify(videoURLs))}`)
    }
    setSelectedFile([])
  }

  const handleDelete = (index: number) => {
    const newSelectedFile = selectedFile.filter((_, i) => i !== index)
    setSelectedFile(newSelectedFile)
  }

  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, file: FileWithOrder) => {
    setCurrentFile(file)
  }

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const dropHandler = (e: React.DragEvent<HTMLLIElement>, targetFile: FileWithOrder) => {
    e.preventDefault()
    if (!currentFile) return

    const newSelectedFile = [...selectedFile]

    const draggedIndex = newSelectedFile.findIndex((file) => file.id === currentFile.id)
    const targetIndex = newSelectedFile.findIndex((file) => file.id === targetFile.id)

    if (draggedIndex === -1 || targetIndex === -1) {
      console.error('Файл не найден в списке.')
      return
    }

    newSelectedFile.splice(draggedIndex, 1)
    newSelectedFile.splice(targetIndex, 0, currentFile)

    newSelectedFile.forEach((file, index) => {
      file.order = index
    })

    setSelectedFile(newSelectedFile)
    setCurrentFile(null)
  }

  const sortFiles = (a: FileWithOrder, b: FileWithOrder) => a.order - b.order

  return (
    <section className={styles.load}>
      <h2 className={styles.loadTitle}>Выберите способ загрузки</h2>
      <div className={styles.links}>
        <Button
          onClick={handleCompletelyClick}
          className={isFragmentVideo ? styles.linksFragment : styles.linksCompletely}
        >
          {!isFragmentVideo ? <IconRoundPlusBlack /> : <IconRoundPlus />}
          <span className={styles.linksFragmentText}>Целиком</span>
        </Button>
        <Button
          onClick={handleFragmentClick}
          className={!isFragmentVideo ? styles.linksFragment : styles.linksCompletely}
        >
          {isFragmentVideo ? <IconFragmentBlack /> : <IconFragment />}
          <span className={styles.linksFragmentText}>Фрагментами</span>
        </Button>
      </div>
      <div
        className={`${styles.video} ${isDragging ? styles.dragOver : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {selectedFile.length > 0 ? (
          <ul className={styles.divide}>
            <li>
              <Button className={styles.videoUpload} onClick={handlePick}>
                <IconPlus />
              </Button>
            </li>
            {selectedFile.sort(sortFiles).map((file, index) => (
              <li
                key={index}
                className={styles.videoList}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, file)}
                onDragOver={dragOverHandler}
                onDrop={(e) => dropHandler(e, file)}
              >
                <p className={styles.videoListText}>
                  {index + 1}. {file.file.name}
                </p>
                <Button className={styles.videoListDelete} onClick={() => handleDelete(index)}>
                  <IconDelete />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <Button className={styles.videoUpload} onClick={handlePick}>
              <IconPlus />
            </Button>
            <h3 className={styles.videoAction}>Загрузить видео</h3>
            <p className={styles.videoDescription}>Расположите в порядке очередности</p>
            <p className={styles.videoDescription}>Перетащите сюда</p>
          </>
        )}
      </div>
      {selectedFile.length > 0 && (
        <Button className={styles.download} onClick={handleUpload}>
          Загрузить
        </Button>
      )}
      <input
        type="file"
        ref={videoPicker}
        accept="video/*"
        onChange={handleChange}
        className={styles.hidden}
        multiple={isFragmentVideo}
      />
    </section>
  )
}
