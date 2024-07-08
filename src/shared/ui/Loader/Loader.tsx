import React from 'react'
import styles from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  return <div className={`${styles.loader} ${className}`}></div>
}
