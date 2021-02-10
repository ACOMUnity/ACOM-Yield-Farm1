import React, { FC } from 'react'
import cls from 'classnames'

import Button from '../Button'

import styles from './index.module.scss'

interface IOption {
  label: string
  value: number
}

interface IOptionGroup {
  options: IOption[]
  value: string | number
  onChange: (val: number) => void
  variant?: string
}

const OptionGroup: FC<IOptionGroup> = ({
  value,
  options,
  variant,
  onChange,
}) => {
  const classes = cls(styles.wrapper, variant)

  return (
    <div className={classes}>
      {options.map((option: IOption) => (
        <Button
          key={option.value}
          variant={styles.option}
          active={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export default OptionGroup
