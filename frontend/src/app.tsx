import { Route } from 'react-router-dom'
import * as React from 'react'
import { observer } from 'mobx-react'
import { authStore } from 'stores'
import { constants } from 'helpers'

import * as Pages from 'pages'
import PrivateRoute from 'components/private-route'


const s = require('./style.css')

@observer
class App extends React.Component<AppProps> {

  render() {
    return (
      <div className={s.pageContainer}>
        <PrivateRoute
          signinComponent={Pages.Auth}
          waitingComponent={Pages.WaitPage}
          isAuthorized={authStore.isAuthorized}
          isUnAuthorized={authStore.isUnAuthorized}
          location={this.props.location}
        >
          <Route exact path={constants.PagesPaths.HOME} component={Pages.Home} />
        </PrivateRoute>
      </div>
    )
  }
}

interface AppProps {
  location?: any
  history?: any
}

export default App
