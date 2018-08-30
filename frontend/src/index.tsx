import './img/favicon.png'
import '!style-loader!css-loader!style.css'

import App from './app'
import { render } from 'react-dom'
import * as stores from 'stores'
import * as React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter, Switch } from 'react-router-dom'

render(
  <BrowserRouter>
    <Provider {...stores}>
      <Switch>
        <App />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
