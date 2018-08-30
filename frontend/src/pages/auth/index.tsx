import * as React from 'react'

import { authStore } from 'stores'
import Button from 'components/ui/button'

const s = require('./style.css')

class Auth extends React.PureComponent<any, any> {

  render() {
    return (
      <div className={s.wrapper}>
        <p className={s.text}>You must be authorized, using your Okta account</p>
        <Button onClick={authStore.login} txt="Login"/>
      </div>
    )
  }
}

export default Auth