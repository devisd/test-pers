'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LEAD_DATA } from '@/shared/mock'
import Button from '@/shared/ui/Button'
import { IconPlay } from '@/shared/ui/Icons'
import { DropdownMenu } from '@/entities/drop-down'
import styles from './LeadForm.module.scss'
import { ILeadData } from './model'

export const LeadForm = () => {
  const router = useRouter()
  const [savedData, setSavedData] = useState<ILeadData[]>([])
  const [selectedData, setSelectedData] = useState<{ [key: number]: string }>({})
  const [linkClient, setLinkClient] = useState('')

  const handleUpdate = (id: number, value: string) => {
    setSelectedData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    setSavedData([
      {
        id: 1,
        name: 'string',
        product: 'string',
        tel: 'string',
      },
    ])
  }

  const onValueChange = (e) => {
    setLinkClient(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className={styles.head}>
        <h1 className={styles.title}>Генерация видероликов</h1>
        <div className={styles.btn}>
          <Link href={'/generate'}>Назад к генерации</Link>
          <Button variant="white" onClick={handleSave}>
            Сохранить
          </Button>
          <Button
            variant="white"
            className="flex gap-3"
            disabled={savedData.length ? false : true}
            onClick={() => router.push('/pre-interview/')}
          >
            <span>Включить</span>
            <IconPlay />
          </Button>
        </div>
      </div>
      <form className={styles.form} onClick={handleSubmit}>
        <input
          className={styles.formLink}
          value={linkClient}
          placeholder="Ссылка на сайт с лид-формой"
          onChange={onValueChange}
        />
        <Button type="submit" variant="white" className="rounded-2xl">
          Принять тестовый запрос
        </Button>
      </form>
      <ul className={styles.list}>
        {LEAD_DATA.map((el) => (
          <li key={el.id} className={styles.listItem}>
            <p className={styles.listItemText}>{el.description}</p>
            <DropdownMenu
              className={styles.dropDown}
              buttonText={selectedData[el.id] || el.description}
              fragments={[
                { id: 'description', name: el.description },
                { id: 'product', name: `${'product:'} ${el.product}` },
                { id: 'tel', name: `${'tel:'} ${el.tel}` },
                { id: 'name', name: `${'name:'} ${el.name}` },
              ]}
              onUpdate={(name) => handleUpdate(el.id, name)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
