import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => ( 
    <header>
        <div className='header'>
        <nav>
                <Link to='/' className='header-link'> Home </Link>
                <Link to='/sensors' className='header-link'> Sensors </Link>
                <Link to='/users' className='header-link'> Users </Link>
                <Link to='/dev' className='header-link'> Development </Link>
        </nav> 
        </div>
    </header>
)

export default Header