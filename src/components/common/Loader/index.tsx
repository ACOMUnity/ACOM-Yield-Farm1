import React, { FC, SVGProps } from 'react'
import cls from 'classnames'
import { ReactComponent as SpinnerIcon } from 'assets/images/svgs/spinner.svg'

import styles from './index.module.scss'

interface ILoader {
  size?: number
  Icon?: FC<SVGProps<SVGSVGElement>>
  variant?: string
}

const Loader: FC<ILoader> = ({ size = 16, Icon = SpinnerIcon, variant }: ILoader) => {
  const classes = cls(styles.loader, variant)

  return <Icon className={classes} style={{ width: size, height: size }} />
}

export default Loader
