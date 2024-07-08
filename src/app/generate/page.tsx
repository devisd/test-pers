'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Button from '@/shared/ui/Button'
import Container from '@/shared/ui/Container'
import { IconDelete, IconNote, IconRoundPlus } from '@/shared/ui/Icons'
import { DropdownMenu } from '@/entities/drop-down'
import { GenerateRow } from '@/features/generate-row'
import styles from './page.module.scss'

export default function Page() {
  const [rows, setRows] = useState([
    { id: Date.now(), phone: '', name1: '', phone2: '', time: '', name4: '' },
  ])

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), phone: '', name1: '', phone2: '', time: '', name4: '' }])
    handleGenerateJSON()
  }

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleUpdateRow = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value }
      }
      return row
    })
    setRows(updatedRows)
  }

  const handleGenerateJSON = () => {
    console.log(rows)
  }

  return (
    <Container>
      <div className={styles.head}>
        <h1 className={styles.title}>Генерация видероликов</h1>
        <div className={styles.btns}>
          <Link href={'/choice/upload'}>Назад к персонализации</Link>
          <DropdownMenu
            buttonText="Генерация"
            fragments={[
              { id: 'json', name: 'JSON' },
              { id: 'onPage', name: 'На странице' },
            ]}
            hasIcons
            isWhite
          />
          <Button variant="white" className="rounded-2xl">
            Импорт JSON <IconNote />
          </Button>
        </div>
      </div>

      <div>
        {rows.map((row) => (
          <div key={row.id} className="flex gap-4">
            <Button onClick={() => handleDeleteRow(row.id)}>
              <IconDelete />
            </Button>
            <GenerateRow onUpdate={(field, value) => handleUpdateRow(row.id, field, value)} />
          </div>
        ))}
        <Button className={styles.addBtn} onClick={handleAddRow}>
          Добавить <IconRoundPlus />
        </Button>
      </div>
    </Container>
  )
}
