'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import Button from '@/shared/ui/Button'
import { IconDelete, IconEdit, IconSend } from '@/shared/ui/Icons'
import { EditPopup } from '@/entities/edit-popup'
import styles from './VideoList.module.scss'
import { Video, VideoListProps } from './model'

const VideoList: FC<VideoListProps> = ({ videosData, title, isReady }) => {
  const [videos, setVideos] = useState<Video[]>(videosData)
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  const handleButtonModalOpen = (id: number) => {
    setActiveVideoId(activeVideoId === Number(id) ? null : id)
  }

  const onDeleteVideo = (id: number) => {
    const deletedVideos = videos.filter((video) => video.id !== id)
    setVideos(deletedVideos)
  }

  const handleSave = (id: number, newTitle: string, newDescription: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, title: newTitle, description: newDescription } : video
      )
    )
    setActiveVideoId(null)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setActiveVideoId(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Implementation of adding newly created projects from localStorage and adding them to the Editable list
  useEffect(() => {
    const local = localStorage?.getItem('editable_project')
    const projects = local ? JSON.parse(local) : ''
    const renderData = projects && !isReady ? [...videosData, projects] : videosData

    setVideos(renderData)
  }, [])
  // =====

  return (
    <section className={styles.video}>
      <h2 className={styles.videoTitle}>{title}</h2>
      <ul className={styles.list}>
        {videos.map((el) => (
          <li key={el.id} className={styles.listItem}>
            <div className={styles.listItemWrapper}>
              <Image
                src={el.img}
                alt="picture"
                className={styles.listItemWrapperImage}
                width={91}
                height={56}
              />
              <div className={styles.listItemWrapperDescription}>
                <h3 className={styles.listItemWrapperDescriptionHeading}>{el.title}</h3>
                <p className={styles.listItemWrapperDescriptionText}>{el.description}</p>
              </div>
            </div>
            <div className={styles.button}>
              {!isReady ? (
                <>
                  <Link href="/choice/">
                    <IconEdit />
                  </Link>
                  <Button onClick={() => onDeleteVideo(el.id)}>
                    <IconDelete />
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/generate" className={styles.buttonWrapSend}>
                    <span>Разослать</span>
                    <IconSend />
                  </Link>
                  <div className={styles.buttonWrap}>
                    <Button onClick={() => handleButtonModalOpen(el.id)}>
                      <IconEdit />
                    </Button>
                    {activeVideoId === el.id && (
                      <div ref={popupRef}>
                        <EditPopup
                          handleButtonModalOpen={() => handleButtonModalOpen(el.id)}
                          id={el.id}
                          title={el.title}
                          description={el.description}
                          onSave={handleSave}
                        />
                      </div>
                    )}
                  </div>
                  <Button onClick={() => onDeleteVideo(el.id)}>
                    <IconDelete />
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { VideoList }
