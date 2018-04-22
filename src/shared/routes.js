import Home from './Home'
import MapView from './MapView'
import Sensors from './Sensors'
import Alarms from './Alarms'
import Settings from './Settings'
import Grid from './Grid'

import { fetchPopularRepos } from './api'

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
    path: '/sensors',
    exact: true,
    component: Sensors,
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
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes