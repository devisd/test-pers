'use client'

import Link from 'next/link'
import { FC, useState, useEffect } from 'react'
import Button from '@/shared/ui/Button'
import { IconCross, IconEdit } from '@/shared/ui/Icons'
import styles from './EditPopup.module.scss'

type EditProps = {
  handleButtonModalOpen?: () => void
  togglePopup?: () => void
  id?: number
  title?: string
  description?: string
  onSave?: (id: number, title: string, description: string) => void
  isNew?: boolean
  centered?: boolean
}

export const EditPopup: FC<EditProps> = ({
  handleButtonModalOpen,
  togglePopup,
  id,
  title = '',
  description = '',
  onSave,
  isNew,
  centered = false,
}) => {
  const [editableTitle, setEditableTitle] = useState('')
  const [editableDescription, setEditableDescription] = useState('')

  useEffect(() => {
    if (!isNew) {
      setEditableTitle(title)
      setEditableDescription(description)
    }
  }, [isNew, title, description])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value)
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableDescription(e.target.value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNew) {
      if (e.target.name === 'title') {
        document.querySelector<HTMLInputElement>('input[name="description"]')?.focus()
      }
    } else {
      onSave(id, editableTitle, editableDescription)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNew && e.key === 'Enter') {
      if (e.currentTarget.name === 'title') {
        document.querySelector<HTMLInputElement>('input[name="description"]')?.focus()
      }
    } else if (!isNew && e.key === 'Enter') {
      onSave(id, editableTitle, editableDescription)
    }
  }

  const handleProjectCreateClick = () => {
    const data = { title: editableTitle, description: editableDescription }
    // Adding logic for saving a new project to localStorage
    localStorage.setItem(
      'editable_project',
      JSON.stringify({
        id: data.title, // Random ID, since there is no logic for adding a new project and getting data from the server.
        img: '/wave_picture.webp',
        title: editableTitle,
        description: editableDescription,
      })
    )
    // =======

    togglePopup()
  }

  return (
    <div className={`${styles.popup} ${centered ? styles.centered : ''}`}>
      <ul className={styles.popupContent}>
        <li className={styles.popupContentEdit}>
          <IconEdit />
          <input
            name="title"
            value={editableTitle}
            type="text"
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Название видеоролика"
          />
        </li>
        <li className={styles.popupContentEdit}>
          <IconEdit />
          <input
            name="description"
            value={editableDescription}
            type="text"
            onChange={handleDescriptionChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Описание видеоролика"
          />
        </li>
        {isNew && (
          <li className={`${styles.popupContentProject} mx-auto`}>
            <Link
              href="/upload"
              className={styles.popupContentProjectButton}
              onClick={handleProjectCreateClick}
            >
              Создать проект
            </Link>
          </li>
        )}
      </ul>
      <Button className={styles.popupDelete} onClick={isNew ? togglePopup : handleButtonModalOpen}>
        <IconCross />
      </Button>
    </div>
  )
}

// 'use client'

// import Link from 'next/link'
// import { FC, useEffect, useState } from 'react'
// import Button from '@/shared/ui/Button'
// import { IconCross, IconEdit } from '@/shared/ui/Icons'
// import styles from './EditPopup.module.scss'

// type EditProps = {
//   handleButtonModalOpen?: () => void
//   togglePopup?: () => void
//   id?: number
//   title?: string
//   description?: string
//   onSave?: (id: number, title: string, description: string) => void
//   isNew?: boolean
//   centered?: boolean
// }

// export const EditPopup: FC<EditProps> = ({
//   handleButtonModalOpen,
//   togglePopup,
//   id,
//   title = '',
//   description = '',
//   onSave,
//   isNew,
//   centered = false,
// }) => {
//   const [editableTitle, setEditableTitle] = useState(title)
//   const [editableDescription, setEditableDescription] = useState(description)

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditableTitle(e.target.value)
//   }
//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditableDescription(e.target.value)
//   }

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     if (isNew) {
//       if (e.target.name === 'title') {
//         document.querySelector<HTMLInputElement>('input[name="description"]')?.focus()
//       }
//     } else {
//       onSave(id, editableTitle, editableDescription)
//     }
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (isNew && e.key === 'Enter') {
//       if (e.currentTarget.name === 'title') {
//         document.querySelector<HTMLInputElement>('input[name="description"]')?.focus()
//       }
//     } else if (!isNew && e.key === 'Enter') {
//       onSave(id, editableTitle, editableDescription)
//     }
//   }

//   const handleProjectCreateClick = () => {
//     const data = { title: editableTitle, description: editableDescription }
//     // Adding logic for saving a new project to localStorage
//     localStorage.setItem(
//       'editable_project',
//       JSON.stringify({
//         id: data.title, // Random ID, since there is no logic for adding a new project and getting data from the server.
//         img: '/wave_picture.webp',
//         title: editableTitle,
//         description: editableDescription,
//       })
//     )
//     // =======

//     console.log(data)
//     togglePopup()
//   }

//   useEffect(() => {
//     if (isNew) {
//       setEditableTitle(title)
//       setEditableDescription(description)
//     }
//   }, [isNew, title, description])

//   return (
//     <div className={`${styles.popup} ${centered ? styles.centered : ''}`}>
//       <ul className={styles.popupContent}>
//         <li className={styles.popupContentEdit}>
//           <IconEdit />
//           <input
//             value={editableTitle}
//             // value={isNew ? title : editableTitle}
//             type="text"
//             onChange={handleTitleChange}
//             onBlur={handleBlur}
//             onKeyDown={handleKeyDown}
//             placeholder="Название видеоролика"
//           />
//         </li>
//         <li className={styles.popupContentEdit}>
//           <IconEdit />
//           <input
//             value={editableDescription}
//             // value={isNew ? '' : editableDescription}
//             type="text"
//             onChange={handleDescriptionChange}
//             onBlur={handleBlur}
//             onKeyDown={handleKeyDown}
//             placeholder="Описание видеоролика"
//           />
//         </li>
//         {isNew && (
//           <li className={styles.popupContentProject}>
//             <Link
//               href="/upload"
//               className={styles.popupContentProjectButton}
//               onClick={handleProjectCreateClick}
//             >
//               Создать проект
//             </Link>
//           </li>
//         )}
//       </ul>
//       <Button className={styles.popupDelete} onClick={isNew ? togglePopup : handleButtonModalOpen}>
//         <IconCross />
//       </Button>
//     </div>
//   )
// }
