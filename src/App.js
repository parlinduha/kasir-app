import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components'
import { Home, Sukses } from './Pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Route path="/" component={Home} exact />
          <Route path="/Sukses" component={Sukses} />
        </main>
      </BrowserRouter>
    )
  }
}
