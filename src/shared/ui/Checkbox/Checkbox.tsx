'use client'

import React, { useState } from 'react'
import { IconCheckbox, IconCheckboxActive } from '../Icons'

interface CheckboxProps {
  id?: number
  onChange?: () => void
}

export const Checkbox = ({ id, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = () => {
    setChecked(!checked)
    onChange()
  }

  return (
    <>
      <input
        type="checkbox"
        id={id ? id.toString() : ''}
        checked={checked}
        onChange={handleCheckboxChange}
        className={'hidden'}
      />
      {checked ? <IconCheckboxActive /> : <IconCheckbox />}
    </>
  )
}
