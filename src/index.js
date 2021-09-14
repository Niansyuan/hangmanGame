import Hangman from './hangman'
import getPuzzle from './request'
let game1

//display console.log(game1.getpuzzle()) on web
const puzzleP=function(){
    const puzzleReturn=document.createElement('p')
    puzzleReturn.innerHTML='' //''內放甚麼網頁就出現什麼
    game1.puzzle.split('').forEach((wordLetter)=>{
        const letterEl=document.createElement('span')
        letterEl.textContent=wordLetter
        puzzleReturn.appendChild(letterEl)
    })
    return puzzleReturn
}

//display console.log(game1.guessAllowedTimes) on web
const remainTimesP=function(){
    const timesReturn=document.createElement('div')
    timesReturn.textContent=`you have ${game1.guessAllowedTimes} times left`
    return timesReturn
}
//display status
const statusP=function(){
    const gameStatus=document.createElement('div')
    gameStatus.textContent=`status: ${game1.status}`
    return gameStatus
}

//添加至<div id=getpuzzle>
const renderPuzzle=function(){
    document.querySelector('#getpuzzle').innerHTML=''
    document.querySelector('#getpuzzle').appendChild(puzzleP())
    document.querySelector('#getpuzzle').appendChild(remainTimesP())
    document.querySelector('#getpuzzle').appendChild(statusP())
    
}

//在input欄位猜字母並動作
document.querySelector('#guess').addEventListener('input',(e)=>{
    let guessLetter=e.data
    const alphabets=/^[a-zA-Z]/
    if(!guessLetter.match(alphabets)){
        alert('must be alphabets!')
    }else{
        game1.makeGuess(guessLetter)
        renderPuzzle()
        
    }
})

const startGame=async()=>{
    const puzzle=await getPuzzle('1')
    game1=new Hangman(puzzle,6)
    console.log(puzzle)  
    renderPuzzle()
    document.querySelector('#guess').disabled=false //讓input可以再次輸入
    document.querySelector('#guess').value='' //清空input
    
}
document.querySelector('#reset').addEventListener('click',startGame)
startGame()