import React from 'react'
import { FRAGMENTS_FIRST, FRAGMENTS_FOURTH, FRAGMENTS_THIRD, FRAGMENTS_SECOND } from '@/shared/mock'
import { IconPhone } from '@/shared/ui/Icons'
import { DropdownMenu } from '@/entities/drop-down'
import styles from './GenerateRow.module.scss'

interface GenerateRowProps {
  onUpdate: (name, value) => void
}

export const GenerateRow = ({ onUpdate }: GenerateRowProps) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target
    onUpdate(name, value)
  }

  return (
    <div className="flex items-center gap-4">
      <label className={styles.label}>
        <input
          type="tel"
          name="phone"
          maxLength={10}
          onChange={handleInputChange}
          placeholder="+7 (777) 777 77 77"
        />
        <IconPhone />
      </label>
      <DropdownMenu buttonText="№1 Имя" fragments={FRAGMENTS_FIRST} onUpdate={onUpdate} />
      <DropdownMenu buttonText="№2 Телефон" fragments={FRAGMENTS_SECOND} onUpdate={onUpdate} />
      <DropdownMenu buttonText="№3 Время" fragments={FRAGMENTS_THIRD} onUpdate={onUpdate} />
      <DropdownMenu buttonText="№4 Имя" fragments={FRAGMENTS_FOURTH} onUpdate={onUpdate} />
    </div>
  )
}
