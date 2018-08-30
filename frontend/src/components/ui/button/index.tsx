import * as React from 'react'
import * as classNames from 'classnames'

const s = require('./style.css')

const getClassNames = (stroked: boolean, color: string, disabled: boolean, blured: boolean): string => classNames({
  btn: true,
  [s.defaultButton]: true,
  [s.greenButton]: color === 'green',
  [s.greyButton]: color === 'grey',
  [s.yellowButton]: color === 'yellow',
  [s.redButton]: color === 'red',
  [s.blurButton]: blured,
  [s.stroked]: stroked,
  [s.disabled]: disabled
})

const Button = ({
  onClick,
  stroked,
  disabled,
  className,
  color,
  txt,
  type,
  blured
}: Props): JSX.Element => (
  <button
    className={classNames(getClassNames(stroked, color, disabled, blured), className)}
    onClick={onClick}
    disabled={disabled}
    type={type || 'button'}
  >
    {txt}
  </button>
)

interface Props {
  className?: string
  onClick: (e: EventInit) => void
  stroked?: boolean
  disabled?: boolean
  txt: string
  color?: 'green' | 'grey' | 'yellow' | 'red'
  type?: string
  blured?: boolean
}

export default Button