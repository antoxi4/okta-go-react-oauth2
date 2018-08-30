import * as React from 'react'

import { authStore } from 'stores'

import Button from 'components/ui/button'

const s = require('./style.css')
class HomePage extends React.Component<{}> {
  render() {
    const { user } = authStore

    return (
      <div className={s.wrapper}>
        <p className={s.text}>You have been authorized as {user.Name}.</p>
        <Button onClick={authStore.logout} txt="Logout"/>
      </div>
    )
  }
}

export default HomePage