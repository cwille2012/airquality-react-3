import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header () {
    const pages = [{
        name: 'Home',
        param: 'home'
      }, {
        name: 'Map',
        param: 'map',
      }, {
        name: 'Sensors',
        param: 'sensors',
      }, {
        name: 'Alarms',
        param: 'alarms',
      }, {
        name: 'Settings',
        param: 'settings',
      }]

  return (
    <header>
        <div className='header'>
            <ul>
            {pages.map(({ name, param }) => (
                <li key={param}>
                <NavLink activeStyle={{fontWeight: 'bold'}} to={`/${param}`}>
                    {name}
                </NavLink>
                </li>
            ))}
            </ul>
        </div>
    </header>
  )
}