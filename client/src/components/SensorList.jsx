import React from 'react'
import SensorAPI from '../api-sensors'
import { Link } from 'react-router-dom'

//add ability to sort/display sensors by different parameters

const SensorList = () => (
  <div className='main'>
    <ul>
      {
        SensorAPI.all().map(s => (
          <li key={s.id}>
            <Link to={`/sensors/${s.id}`}>{s.name} {s.id}</Link>
          </li>
        ))
      }
    </ul>
    <button>
      <Link style={{display: 'block', height: '100%', textDecoration: 'none', color: 'black'}} to='/sensors/new'>Add Sensor</Link>
    </button>
  </div>
)

export default SensorList
