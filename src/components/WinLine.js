import { useState,  useEffect, useRef } from 'react'


const WinLine = ({mode, position}) => {
  const iTicTacToeLength = 3
  const [fDegree, setFDegree] = useState(0) 
  const lineRef = useRef(null)

  const fnFindDiagonalDegree = () => {
    const iParentWidth = lineRef.current.parentElement.offsetWidth
    const iParentHeight = lineRef.current.parentElement.offsetHeight 
    const fTempDegree = Math.atan(iParentHeight / iParentWidth) * 180 / Math.PI
    console.log("fTempDegree: " + fTempDegree) 
    setFDegree(fTempDegree)
  }

  useEffect(() => {
    if(mode === "backslashdiagonal" || mode === "slashdiagonal") {
      window.addEventListener('resize', fnFindDiagonalDegree)
      fnFindDiagonalDegree()  
    }

    return () => { 
      window.removeEventListener('resize', fnFindDiagonalDegree)
    }
  }, [])

  const fnStyleString = () => {
    if(mode === "vertical") {
      return {
        left : ((position * 2 + 1) / (iTicTacToeLength * 2 ) * 100) + "%" 
      }

    } else if(mode === "horizontal") {
      return {
        top : ((position * 2 + 1) / (iTicTacToeLength * 2 ) * 100) + "%" 
      }
    } else if(mode === "backslashdiagonal") {
      return  {
        top : "50%",
        transform: "skew(0, " + fDegree + "deg)" 
    }
} else if(mode === "slashdiagonal") {
  return  {
    top : "50%",
    transform: "skew(0, -" + fDegree + "deg)" 
}
} else {
      return {
      }
    }
  }

  return (
    <div ref={lineRef} className={'strikethrough ' + (mode !== "vertical" ? "horizontal" : "vertical")} style={fnStyleString()}></div>
  )
}

export default WinLine