import { useContext } from 'react'
import { STATE, TicTacToeContext } from './TicTacToe'


const Button = ({buttonID, onClick}) => {

  const gameSetting = useContext(TicTacToeContext)
  const fnSelfClick = (buttonID) => {
    onClick(buttonID)
  }

  return (

    <button data-id={buttonID} onClick ={() => fnSelfClick(buttonID)} className={gameSetting.buttonsStatus[buttonID]} 
    disabled={gameSetting.state !== STATE.PLAY || gameSetting.buttonsStatus[buttonID] !== ""} ></button>
  )
}

export default Button
