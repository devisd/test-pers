import { useState, useEffect, Fragment } from 'react'
import Button from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { IconDelete, IconRoundPlus, IconUpload } from '@/shared/ui/Icons'
import styles from './FragmentsUpload.module.scss'

interface IPers {
  video_id: number
  name: string
  time: number
  values: null | [] | File[]
}

interface FragmentsUploadProps {
  isPending: (value: boolean) => void
  itSave: boolean
}

export const FragmentsUpload = ({ isPending, itSave }: FragmentsUploadProps) => {
  const [fragmentName, setFragmentName] = useState('')
  const [fragmentNumber, setFragmentNumber] = useState(1)
  const [fragments, setFragments] = useState<IPers[]>([])
  const [pers, setPers] = useState<IPers[]>([])
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    const storedFragments = localStorage.getItem('fragments')
    if (storedFragments) {
      setFragments(JSON.parse(storedFragments))
    }
  }, [])

  const handleCheckboxChange = (video_id) => {
    if (fragments.includes(video_id)) {
      setFragments(fragments.filter((fragmentId) => fragmentId !== video_id))
    } else {
      setFragments([...fragments, video_id])
    }
    setIsActive(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, video_id: number) => {
    const file = event.target.files?.[0]
    if (file) {
      setPers((prevPers) =>
        prevPers.map((fragment) => {
          return fragment.video_id === video_id
            ? { ...fragment, values: [...(fragment.values || []), event.target.files[0]] }
            : fragment
        })
      )
    }
  }

  return (
    <>
      <div className={styles.head}>
        <h2>
          Перс №{fragmentNumber} ({fragmentName})
        </h2>
        <label htmlFor="videoUpload">
          Загрузить видео <IconRoundPlus />
          <input
            type="file"
            accept="video/*"
            id="videoUpload"
            name="video"
            className="hidden"
            multiple
            onChange={(e) => handleFileChange(e, fragmentNumber)}
          />
        </label>
        <Button>
          Удалить выбранное <IconDelete />
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.fragments}>
          <div className={styles.fragmentsHead}>
            <label>
              <Checkbox />
              Плавный переход (начало)
            </label>
            <label>
              <Checkbox />
              Плавный переход (конец)
            </label>
          </div>
          <ul className={styles.fragmentsList}>
            {!isActive && (
              <>
                {pers.map(({ name, video_id, values }) => (
                  <li key={video_id} className="flex justify-between">
                    <div>
                      <label>
                        <Checkbox id={video_id} onChange={() => handleCheckboxChange(video_id)} />
                        <span className={styles.fragmentsListNumber}> {name}</span>
                      </label>
                      <label htmlFor={`fragmentUpload-${video_id}`} className="ml-4">
                        {name.length ? 'Заменить' : 'Добавить'} <IconUpload />
                        <input
                          type="file"
                          id={`fragmentUpload-${video_id}`}
                          name="fragment"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, video_id)}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor={`fragmentUpload-${video_id}`}>
                        Видео по умолчанию
                        <input
                          type="file"
                          id={`fragmentUpload-${video_id}`}
                          name="fragment"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, video_id)}
                        />
                      </label>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        <div>
          <video controls width="800" height="450" src="" className="rounded-xl bg-dark-04"></video>

          <ul className={styles.player}>
            {fragments.map(({ video_id, name, values }) => (
              <Fragment key={video_id}>
                <li>
                  <Button>
                    <p>{name}</p>
                    <span className={styles.elementCount}>{values ? values.length : 0}</span>
                    <IconUpload />
                  </Button>
                </li>
                <li className={styles.playerMiddle}></li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
