import crossLogo from '../images/cross.png'
import circleLogo from '../images/circle.png'

import { useContext } from 'react'
import { ICON, STATE, TicTacToeContext } from './TicTacToe'

const Title = ({title, onReset}) => {

  const gameSetting = useContext(TicTacToeContext)

  const resultHtml = gameSetting.state === STATE.DRAW ? "Draw!!!" : (<><img alt='' src={gameSetting.currentIcon === ICON.CROSS ? crossLogo : circleLogo} /> wins.</>)

  return (
    <h1>{ title } <button onClick={onReset}>Reset</button>{/* <button onClick={gameSetting.fnReset2}>{gameSetting.currentIcon}</button> */}
        {gameSetting.state !== STATE.PLAY && <span id="resultPane">{resultHtml}</span>}
    </h1>
  )
}

export default Title
