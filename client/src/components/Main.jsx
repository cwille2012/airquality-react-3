import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Sensors from './Sensors'
import Users from './Users'
import Development from './Development'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/sensors' component={Sensors}/>
      <Route path='/users' component={Users}/>
      <Route path='/dev' component={Development}/>
    </Switch>
  </main>
)

export default Main
