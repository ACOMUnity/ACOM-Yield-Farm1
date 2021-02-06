import React, { useEffect, useRef } from 'react'

import Jazzicon from '@metamask/jazzicon'
import './index.scss'
interface Props {
  address: string
}
const Identicon: React.FC<Props> = ({ address }: Props) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)))
    }
  }, [address])

  return <div className="identicon-container" ref={ref as any} />
}

export default Identicon
