import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SensorList from './SensorList'
import Sensor from './Sensor'

const Sensors = () => (
  <div className='main'>
    <h3>Sensor Information</h3>
    <Switch>
      <Route exact path='/sensors' component={SensorList}/>
      <Route path='/sensors/:id' component={Sensor}/>
    </Switch>
  </div>
)

export default Sensors