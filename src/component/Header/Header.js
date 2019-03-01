import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className='navbar'>
      <div className='navbar-logo'>
        shelfi
      </div>
      <ul className='navbar-items'>
        <Link className='navbar-link' to='/'><li className='navbar-item'>Dashbord</li></Link>
        <Link className='navbar-link' to='/add'><li className='navbar-item'>Add Inventory</li></Link>
      </ul>
    </header>
  )
}
