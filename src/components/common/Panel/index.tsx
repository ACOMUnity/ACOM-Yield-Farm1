import React, { FC, ReactNode, SVGProps } from 'react'
import cls from 'classnames'
import Portal from '@reach/portal'
import { ReactComponent as CloseIcon } from 'assets/images/svgs/close.svg'

import Button from '../Button'

import styles from './index.module.scss'

interface IPanel {
  children: ReactNode
  title: string
  backmask?: string
  variant?: string
  container?: string
  onClose?: () => void
  open?: boolean
  SubPanel?: ReactNode
}

const Panel: FC<IPanel> = ({
  title,
  children,
  backmask,
  variant,
  container,
  onClose,
  open = true,
  SubPanel,
}: IPanel) => {
  const wrapperClass = cls(styles.wrapper, backmask, { [styles.hide]: !open })
  const panelClass = cls(styles.panel, variant)
  const titleClass = cls(styles.title, { [styles.showClose]: onClose })
  const bodyClass = cls(styles.body, { [container || '']: container })
  const headingClass = cls(styles.heading, { [styles.hideBorder]: !title })

  return (
    <Portal>
      <div className={wrapperClass}>
        <div className={styles.inner}>
          <div className={panelClass}>
            <section className={headingClass}>
              <span className={titleClass}>{title}</span>
              {onClose && (
                <Button variant={styles.close} onClick={onClose}>
                  <CloseIcon />
                </Button>
              )}
            </section>
            <section className={bodyClass}>{children}</section>
          </div>
          {SubPanel && <div className={styles.subpanel}>{SubPanel}</div>}
        </div>
      </div>
    </Portal>
  )
}

export default Panel
