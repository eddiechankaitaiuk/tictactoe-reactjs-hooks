import React, { useReducer } from 'react'
import Title from './Title'
import Button from './Button'
import WinLine from './WinLine'

import '../css/tictactoe.css'

export const TicTacToeContext = React.createContext()

export const ICON = {
  CROSS: "cross",
  CIRCLE: "circle"
}

export const WINLINE = {
  NOTHING: 0,
  VERTICAL: 1,
  HORIZONTAL: 2,
  SLASHDIAGONAL: 4,
  BACKSLASHDIAGONAL: 8
}

export const STATE = {
  PLAY: "play",
  WIN: "win",
  DRAW: "draw"
}

const TicTacToe = () => {

  const defaultGameSetting = {
    state: STATE.PLAY,
    buttonsStatus: ["","","","","","","","",""],
    currentIcon: ICON.CROSS,
    winLine: WINLINE.NOTHING,
    winVerticalPosition:0,
    winHorizontalPosition:0,
  }


  console.log("start")

  const fnCheckWin = (arrButtonsStatus) => {
    //Button array is 0-based index from 0 to 8, listed from top to buttom, left to right.
    //Just need to check button 1, 3, 4, 5, 7 if they have been clicked and then further their neigbouring button.

    const arrButtonsForChecking = [1,3,4,5,7];
    const iTicTacToeLength = 3;
    //let bWinTemp = false
    let objWinStatus = {winLine: WINLINE.NOTHING, vertical_position:0, horizontal_position: 0}
    arrButtonsForChecking.forEach( (iCurrentButtonIndex, index) => {    
        //const iCurrentButtonIndex = checkingItem;
        const strButtonStatus = arrButtonsStatus[iCurrentButtonIndex];

        if(strButtonStatus === ICON.CROSS || strButtonStatus === ICON.CIRCLE) {

            //if iRow = 1, do the horizontal checking
            const iRow = Math.floor(iCurrentButtonIndex / iTicTacToeLength);                    
            //if iColumn = 1, do the vertical checking
            const iColumn = iCurrentButtonIndex % iTicTacToeLength;
            //if both iRow and iColumn are 1, do all horizontal, vertical and diagonal checking

            if(iRow === 1) {
                //Vertical Checking - check previous row (i.e. currentIndex - TicTacToeLength) and next row (i.e. currentIndex + TicTacToeLength) if all status are matched to either cross or circle
                if(arrButtonsStatus[iCurrentButtonIndex - iTicTacToeLength] === arrButtonsStatus[iCurrentButtonIndex + iTicTacToeLength] && arrButtonsStatus[iCurrentButtonIndex - iTicTacToeLength] === strButtonStatus) {
                    objWinStatus.winLine |= WINLINE.VERTICAL
                    objWinStatus.vertical_position = iColumn
                }
            }

            if(iColumn === 1) {
                //Horizontal Checking - check previous column (i.e. currentIndex - 1) and next column (i.e. currentIndex + 1) if all status are matched to either cross or circle
                if(arrButtonsStatus[iCurrentButtonIndex - 1] === arrButtonsStatus[iCurrentButtonIndex + 1] && 
                arrButtonsStatus[iCurrentButtonIndex - 1] === strButtonStatus) {
                  objWinStatus.winLine |= WINLINE.HORIZONTAL
                  objWinStatus.horizontal_position = iRow
                }
            }

            if(iRow === 1 && iColumn === 1) {

                if(arrButtonsStatus[iCurrentButtonIndex - 1 - iTicTacToeLength] === arrButtonsStatus[iCurrentButtonIndex + 1 + iTicTacToeLength] && 
                    arrButtonsStatus[iCurrentButtonIndex - 1 - iTicTacToeLength] === strButtonStatus) {
                    objWinStatus.winLine |= WINLINE.BACKSLASHDIAGONAL
                }

                if(arrButtonsStatus[iCurrentButtonIndex + 1 - iTicTacToeLength] === arrButtonsStatus[iCurrentButtonIndex - 1 + iTicTacToeLength] && arrButtonsStatus[iCurrentButtonIndex + 1 - iTicTacToeLength] === strButtonStatus) {
                    objWinStatus.winLine |= WINLINE.SLASHDIAGONAL
                }

            }

        }

    })
    //if(bWinTemp) { setBWin(bWinTemp);  }
    return objWinStatus
  
}

  const fnReset = () => { dispatch({type: "reset"})}

  const gameReducer = (prevGameSetting, action) => {
    //alert("gamereducer: " + action.type + " : " + action.payload.buttonID)
    switch(action.type) {
      case "reset" : return defaultGameSetting
      case "buttonClick":
          const iButtonID = action.payload.buttonID
          const newButtonsStatus = prevGameSetting.buttonsStatus.map((icon, index) => index === iButtonID ? prevGameSetting.currentIcon : icon)
          const objWinStatus = fnCheckWin(newButtonsStatus)
          if(objWinStatus.winLine > 0) {
            return {
              ...prevGameSetting,
              state: STATE.WIN,
              buttonsStatus: newButtonsStatus,
              winLine: objWinStatus.winLine,
              winVerticalPosition: objWinStatus.vertical_position,
              winHorizontalPosition: objWinStatus.horizontal_position
            }
          }
          else if(newButtonsStatus.filter(val => val === "").length === 0) {
            return {
              ...prevGameSetting,
              state: STATE.DRAW,
              buttonsStatus: newButtonsStatus
            }
          } else {
            return {
              ...prevGameSetting,
              buttonsStatus: newButtonsStatus,
              currentIcon: prevGameSetting.currentIcon === ICON.CROSS ? ICON.CIRCLE : ICON.CROSS
            }
          }
      default:
          return prevGameSetting
    }
  }

  const fnButtonClick = (index) => {
    dispatch({type: "buttonClick", payload:{buttonID: index}})
  }

  const [gameSetting, dispatch] = useReducer(gameReducer, defaultGameSetting)



  return (
    <>
    <TicTacToeContext.Provider value={gameSetting} >
    <Title title="Tic Tac Toe" onReset={fnReset} />
    <div className={'grid-container ' + gameSetting.currentIcon}>
        {
            gameSetting.buttonsStatus.map((item, index) => {
                return(
                <Button key={index} buttonID={index} onClick={fnButtonClick} status={item}  />
                )
            })
        }
        {(gameSetting.winLine & WINLINE.VERTICAL) > 0 && <WinLine mode="vertical" position={gameSetting.winVerticalPosition} />}
        {(gameSetting.winLine & WINLINE.HORIZONTAL) > 0  && <WinLine mode="horizontal" position={gameSetting.winHorizontalPosition} />}
        {(gameSetting.winLine & WINLINE.BACKSLASHDIAGONAL) > 0  && <WinLine mode="backslashdiagonal" />}
        {(gameSetting.winLine & WINLINE.SLASHDIAGONAL) > 0  && <WinLine mode="slashdiagonal" />}
        
 
        </div>
        </TicTacToeContext.Provider>
    </>
  )
}

export default TicTacToe
