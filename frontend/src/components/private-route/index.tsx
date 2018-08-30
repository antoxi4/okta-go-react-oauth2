import * as React from 'react'
import { autorun } from 'mobx'
import { constants } from 'helpers'
import { Redirect, Route } from 'react-router-dom'

import { authStore } from 'stores'

class PrivateRoute extends React.Component<PrivateRouteProps> {

  componentDidMount() {
    autorun(() => {
      authStore.isWaitingAuthorization && authStore.getSession()
    })
  }

  renderSignin = () => (
    <>
      <Route exact path={constants.PagesPaths.SIGNIN} component={this.props.signinComponent} />
      {
        !this.isURLPathNameTheSame(constants.PagesPaths.SIGNIN) &&
        <Redirect to={constants.PagesPaths.SIGNIN} />
      }
    </>
  )

  renderWaitContent = () => <this.props.waitingComponent />

  renderAuthorizedContent = () => {
    const isAlreadyHomeDirectory = !this.isURLPathNameTheSame('/')
    const shouldRedirectedOnHome = this.shouldRedirected() && isAlreadyHomeDirectory

    return shouldRedirectedOnHome ? <Redirect to={'/'} /> : this.props.children
  }

  isURLPathNameTheSame = (path: string): boolean => this.props.location.pathname === path

  shouldRedirected = (): boolean => {
    switch (this.props.location.pathname) {
      case constants.PagesPaths.SIGNIN:
        return true
      default:
        return false
    }
  }

  getContentByApplicationState = (): Array<(JSX.Element[] | JSX.Element)> | JSX.Element | React.ComponentType<any> => {
    if (this.props.isAuthorized) {
      return this.renderAuthorizedContent() as JSX.Element
    } else if (this.props.isUnAuthorized) {
      return this.renderSignin()
    } else {
      return this.renderWaitContent()
    }
  }

  render() {
    return this.getContentByApplicationState()
  }
}

interface PrivateRouteProps {
  location?: Location
  isAuthorized: boolean
  isUnAuthorized: boolean
  signinComponent: React.ComponentType<any>
  waitingComponent: React.ComponentType<any>
}

export default PrivateRoute