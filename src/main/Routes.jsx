import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Dados from '../components/dados/Dados'
import Graficos from '../components/graficos/Graficos'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} /> 
        <Route path='/dados' component={Dados} />
        <Route path='/graficos' component={Graficos} /> 
        <Redirect from='*' to='/' />
    </Switch>