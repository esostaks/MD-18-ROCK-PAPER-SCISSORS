import style from '../Play/Play.module.scss'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'



const Play = () => {

    const {t} = useTranslation()

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
    const [compChoice, setcompChoice] = useState('rock')
    const [result, setResult] = useState('')

    const imgRef = useRef<HTMLImageElement | null>(null)
    const resultRef = useRef<HTMLSpanElement | null>(null)
    const paperRef = useRef<HTMLImageElement | null>(null)
    const rockRef = useRef<HTMLImageElement | null>(null)
    const scissorsRef = useRef<HTMLImageElement | null>(null)


    const collectData = (playerElement: string, computerElement: string, winner: string) => {
        axios.post('http://localhost:3004/statistics', {
            player: playerElement,
            computer: computerElement,
            result: winner     
        }).then(({ data }) => {});
    }
  


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
            resultMessage = `${t('draw')} `
            setResult('draw')
        } else if (playerChoice === 'paper' && compChoice === 'rock') {
            resultMessage = `${t('win')} `
            setResult('user won')
        } else if (playerChoice === 'rock' && compChoice === 'scissors') {
            resultMessage = `${t('win')} `
            setResult('user won')
        } else if (playerChoice === 'scissors' && compChoice === 'paper') {
            resultMessage = `${t('win')} `
            setResult('user won')
        } else {
            resultMessage = `${t('loss')} `
            setResult('PC won')
        }

        if (imgRef.current) {
            imgRef.current.src = elements[compChoice as keyof typeof elements]
            imgRef.current.classList.add('img__active')
        }
        if (resultRef.current) {
            resultRef.current.innerHTML = resultMessage
        }

        
        console.log(`player: ${playerChoice}, PC:  ${compChoice}, result: ${result} `)

        collectData(playerChoice, compChoice, result)        
    }


    return (
        <div className={style.wrapper}>
            <div className={style.result}>
                <img ref={imgRef} className='img_hidden' width='297' height='319'/>
                <span ref={resultRef} className={style.winMessage}></span>
            </div>
            <div className={style.elements}>
                <img ref={paperRef} src="./src/assets/images/paper.jpg" className='zoom' alt="Open palm" width='270' height='290' onClick={selectPaper}/>
                <img ref={rockRef} src="./src/assets/images/rock.jpg" className='zoom' alt="Fist" width='270' height='290' onClick={selectRock}/>
                <img ref={scissorsRef} src="./src/assets/images/scissors.jpg" className='zoom' alt="Fingers as scissors" width='270' height='290' onClick={selectScissors}/>
            </div>
            <button  type="button" className="btn btn-lg btn-success" onClick={decideWinner}>{t('startBtn')}</button>
        </div>
        
      
    );

};
  

export default Play