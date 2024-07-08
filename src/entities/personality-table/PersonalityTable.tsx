'use client'

import React, { useState } from 'react'
import { initialData } from '@/shared/mock'
import styles from './PersonalityTable.module.scss'
import { VideoData } from './model'

export const PersonalityTable = () => {
  const [generationData, setGenerationData] = useState<VideoData[]>(initialData)

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <span className={styles.tableRow}>Телефон</span>
            </th>
            <th>
              <span className={styles.tableRow}>Перс №1 Имя</span>
            </th>
            <th>
              <span className={styles.tableRow}>Перс №2</span>
            </th>
            <th>
              <span className={styles.tableRow}>Перс №3</span>
            </th>
            <th>
              <span className={styles.tableRow}>Перс №4 Имя</span>
            </th>
            <th>
              <span className={styles.tableRow}>Ссылка на видео</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {generationData.map((pers) => (
            <tr key={pers.video_id}>
              <td>
                <span className={styles.tableContent}>{pers.tel}</span>
              </td>
              <td>
                <span className={styles.tableContent}>{pers.first_name}</span>
              </td>
              <td>
                <span className={styles.tableContent}>{pers.item}</span>
              </td>
              <td>
                <span className={styles.tableContent}>{pers.date}</span>
              </td>
              <td>
                <span className={styles.tableContent}>{pers.second_name}</span>
              </td>
              <td>
                <a href={pers.url} target="_blank" rel="noopener noreferrer">
                  <span className={styles.tableContent}>{pers.url}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
