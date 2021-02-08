import React from 'react'
import Identicon from '../Identicon'
import { shortenAddress } from '../../helpers/utils'
import farmer from '../../assets/farmer.png'
import './index.scss'

interface Props {
  address: string
}

const Navbar: React.FC<Props> = ({ address }: Props) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0 sextext addressBold"
        href="https://acom.uno/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={farmer} width="30" height="30" className="d-inline-block align-top" alt="" />
        &nbsp; ACOM Yield Farm <sub>1.0.0</sub>
      </a>
      <div className="d-flex mr-3">
        <div className="address-hash mr-1">
          {address !== '0x0' ? shortenAddress(address) : address}
          {<Identicon address={address} />}
        </div>
        <input className="connect-button" type="button" value="Connect to a wallet" />
      </div>
    </nav>
  )
}

export default Navbar
