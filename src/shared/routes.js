import Home from './Home'
import MapView from './MapView'
import Sensor from './Sensor'
import Alarms from './Alarms'
import Settings from './Settings'
import List from './List'

import { fetchSensorInfo } from './sensor-api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/map',
    exact: true,
    component: MapView,
  },
  {
    path: '/sensors/all',
    component: List,
    fetchInitialData: (path = '') => fetchSensorInfo('all')
  },
  {
    path: '/sensors/:id',
    component: Sensor,
    fetchInitialData: (path = '') => fetchSensorInfo(path.split('/').pop())
  },
  {
    path: '/alarms',
    exact: true,
    component: Alarms,
  },
  {
    path: '/settings',
    exact: true,
    component: Settings,
  }
]

export default routes