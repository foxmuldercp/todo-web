import React from 'react'

import {IndexRoute, Route} from 'react-router'

import HostPage from './containers/HostPage'
import Start from './containers/Start'
import Todos from './containers/Todos'
import NotFound from './containers/NotFound'

const routes = <Route path="/" component={HostPage}>
  <IndexRoute component={Start} />
  <Route path="start" component={Start} />
  <Route path="Todos" component={Todos} />
  <Route path="*" component={NotFound}/>
</Route>

export default routes
