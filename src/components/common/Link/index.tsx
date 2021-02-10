import React, { FC, ReactNode } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface ILink {
  href: string
  children: ReactNode
  variant?: string
}

const Link: FC<ILink> = ({ href, variant, children }: ILink) => {
  const classes = cls(styles.link, variant)

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>
  )
}

export default Link
