import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode | ReactNode[]
  className?: string
  onClick?: () => void
  variant?: 'white'
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  variant,
  disabled,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(styles.base, styles[variant], className, { [styles.disabled]: disabled })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
