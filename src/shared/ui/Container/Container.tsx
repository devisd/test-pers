import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Container.module.scss'

interface ContainerProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn(styles.container, className)}>{children}</div>
}

export default Container
