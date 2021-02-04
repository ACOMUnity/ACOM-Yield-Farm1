import React from 'react'
import farmer from '../../assets/farmer.png'

interface Props {
  account: string
}

const Navbar: React.FC<Props> = ({ account }: Props) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow ">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0 sextext addressBold"
        href="https://acom.uno/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={farmer} width="30" height="30" className="d-inline-block align-top" alt="" />
        &nbsp; ACOM Yield Farm <sub>1.0.0</sub>
      </a>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <b className="addressBold">Address:&nbsp;</b>
          <small className="text-secondary">
            <small id="account">{account}</small>
          </small>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
