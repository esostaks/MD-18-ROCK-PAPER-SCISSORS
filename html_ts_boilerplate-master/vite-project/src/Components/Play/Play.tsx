import style from '../Play/Play.module.scss'
import React, { useState, useRef } from 'react'





const Play = () => {

    type Elements = {
        'paper': string,
        'rock': string,
        'scissors': string 
    }

    const elements: Elements = {
        'paper': "./src/assets/images/paper.jpg",
        'rock': "./src/assets/images/rock.jpg",
        'scissors': "./src/assets/images/scissors.jpg"
    }


    
    const [playerChoice, setPlayerChoice] = useState('')
    const [compChoice, setcompChoice] = useState('')

    const imgRef = useRef<HTMLImageElement | null>(null)
    const resultRef = useRef<HTMLSpanElement | null>(null)
    const paperRef = useRef<HTMLImageElement | null>(null)
    const rockRef = useRef<HTMLImageElement | null>(null)
    const scissorsRef = useRef<HTMLImageElement | null>(null)







    const selectPaper = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault()
        setPlayerChoice('paper')
        if (paperRef.current) {
            paperRef.current.classList.add('enlarged')
        }
        if (rockRef.current) {
            rockRef.current.classList.remove('enlarged')
        }
        if (scissorsRef.current) {
            scissorsRef.current.classList.remove('enlarged')
        }
    }

    const selectRock = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault()
        setPlayerChoice('rock')
        if (rockRef.current) {
            rockRef.current.classList.add('enlarged')
        }
        if (paperRef.current) {
            paperRef.current.classList.remove('enlarged')
        }
        if (scissorsRef.current) {
            scissorsRef.current.classList.remove('enlarged')
        }
    }

    const selectScissors = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault()
        setPlayerChoice('scissors')
        if (scissorsRef.current) {
            scissorsRef.current.classList.add('enlarged')
        }
        if (rockRef.current) {
            rockRef.current.classList.remove('enlarged')
        }
        if (paperRef.current) {
            paperRef.current.classList.remove('enlarged')
        }
        
    }

    const getcompChoice = () => {

        let elements = ['paper', 'rock', 'scissors']

        var i = 0
            , j = 0
            , temp = null
  
        for (i = elements.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = elements[i]
            elements[i] = elements[j]
            elements[j] = temp
        }

        setcompChoice(elements[0])
    }

    const decideWinner = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault()
        getcompChoice()

        let resultMessage = ''

        if (playerChoice === compChoice) {
            resultMessage = 'DRAW'
        } else if (playerChoice === 'paper' && compChoice === 'rock') {
            resultMessage = 'YOU WIN!'
        } else if (playerChoice === 'rock' && compChoice === 'scissors') {
            resultMessage = 'YOU WIN!'
        } else if (playerChoice === 'scissors' && compChoice === 'paper') {
            resultMessage = 'YOU WIN!'
        } else {
            resultMessage = 'YOU LOSE!'
        }

        if (imgRef.current) {
            imgRef.current.src = elements[compChoice as keyof typeof elements]
            imgRef.current.classList.add('img__active')
        }
        if (resultRef.current) {
            resultRef.current.innerHTML = resultMessage
        }


        
    }


    return (
        <div>
            <div>
                <img ref={imgRef} className='img_hidden' width='297' height='319'/>
                <span ref={resultRef}></span>
            </div>
            <div className={style.wrapper}>
                <img ref={paperRef} src="./src/assets/images/paper.jpg" className='zoom' alt="Open palm" width='270' height='290' onClick={selectPaper}/>
                <img ref={rockRef} src="./src/assets/images/rock.jpg" className='zoom' alt="Fist" width='270' height='290' onClick={selectRock}/>
                <img ref={scissorsRef} src="./src/assets/images/scissors.jpg" className='zoom' alt="Fingers as scissors" width='270' height='290' onClick={selectScissors}/>
            </div>
            <button onClick={decideWinner}>LET'S ROLL</button>
        </div>
        
      
    );

};
  

export default Play