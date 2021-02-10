import React, { FC, ReactNode, MouseEvent } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface IButton {
  children: ReactNode
  fullWidth?: boolean
  id?: string
  name?: string
  onClick?: (ev: MouseEvent<HTMLElement>) => void
  rounded?: boolean
  theme?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  nohover?: boolean
  active?: boolean
  variant?: string
  disabled?: boolean
}

const Button: FC<IButton> = ({
  type = 'button',
  theme = 'primary',
  fullWidth = false,
  rounded = false,
  nohover = false,
  active = false,
  disabled = false,
  children,
  onClick,
  variant,
  id,
  name,
}: IButton) => {
  const classes = cls(
    styles.button,
    styles[theme],
    {
      [styles.rounded]: rounded,
      [styles.fullWidth]: fullWidth,
      [styles.static]: nohover,
      [styles.active]: active,
      [styles.disabled]: disabled,
    },
    variant
  )

  const handleClick = (ev: MouseEvent<HTMLElement>) => {
    if (disabled || !onClick) {
      ev.preventDefault()
      return
    }
    onClick(ev)
  }

  return (
    <button className={classes} onClick={handleClick} {...{ type, id, name }}>
      {children}
    </button>
  )
}

export default Button
