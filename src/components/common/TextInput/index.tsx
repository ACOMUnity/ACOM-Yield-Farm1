import React, { ChangeEvent, FC } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface ITextInput {
  type?: 'text' | 'password' | 'number'
  align?: 'left' | 'right' | 'center'
  value: string
  name?: string
  placeholder?: string
  rounded?: boolean
  fullWidth?: boolean
  variant?: string
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<ITextInput> = ({
  type = 'text',
  rounded = false,
  fullWidth = false,
  align = 'left',
  placeholder,
  variant,
  value,
  name,
  onChange,
}) => {
  const classes = cls(
    styles.input,
    styles[align],
    {
      [styles.rounded]: rounded,
      [styles.fullWidth]: fullWidth,
    },
    variant
  )

  return (
    <input
      type={type}
      className={classes}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default TextInput
