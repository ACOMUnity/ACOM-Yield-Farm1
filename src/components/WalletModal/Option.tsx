import Button from 'components/common/Button'
import Link from 'components/common/Link'
import React, { FC, MouseEvent } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface IOption {
  active?: boolean
  clickable?: boolean
  header: React.ReactNode
  icon?: string
  link?: string | null
  onClick?: (ev: MouseEvent<HTMLElement>) => void
  subheader: React.ReactNode | null
}

const Option: FC<IOption> = ({
  link = null,
  clickable = true,
  onClick,
  header,
  subheader = null,
  icon,
  active = false,
}) => {
  const classes = cls(styles.option, {
    [styles.withSub]: subheader,
    [styles.active]: active,
  })

  const content = (
    <Button onClick={onClick} variant={classes} nohover={!clickable}>
      <section className={styles.left}>
        <span className={styles.header}>
          {active && <i className={styles.circle}></i>}
          {header}
        </span>
        {subheader && <small className={styles.subheader}>{subheader}</small>}
      </section>
      <section className={styles.right}>{icon ? <img src={icon} alt="Icon" className={styles.icon} /> : null}</section>
    </Button>
  )
  if (link) {
    return <Link href={link}>{content}</Link>
  }
  return content
}

export default Option
