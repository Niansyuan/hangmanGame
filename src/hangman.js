class Hangman{
    constructor(word, guessAllowedTimes){
    //1.set up the word instance property as an array of lower case letters
    this.word= word.toLowerCase().split('')
    this.guessAllowedTimes= guessAllowedTimes
    //3.set up another instance property to store guessed letters
    this.guessLetters=[]
    this.status='Playing'
    }
    calculateStatus(){
        let finshed= true
        this.word.forEach((wordLetter)=>{
            if(this.guessLetters.includes(wordLetter)||wordLetter===' '){
            }else{
                finshed=false
            }
        })
        if(this.guessAllowedTimes===0){ //Game over
            this.status='Game Over'
        }else if(finshed){ //finsh
            this.status='Finshed !'
        }else{ //playing
            this.status='Playing'
        }
    }
    statusMessage(){
        let input=document.querySelector('#guess')
        if(this.status==='Game Over'){
            input.disabled=true //讓input不能使用//等同於input.setAttribute('disabled',true)
            return this.status=`Oops! The answer is "${this.word.join('')}".`
        }else if(this.status==='Finshed !'){
            input.disabled=true//讓input不能使用//等同於input.setAttribute('disabled',true)
            return this.status='Nice work! You guess right!!'
        }
    }
    get puzzle(){
        let puzzle=''    
        this.word.forEach((wordLetter)=>{
            if(this.guessLetters.includes(wordLetter)||wordLetter===' '){
                puzzle+=wordLetter
            }else{
                puzzle+='*'
            }
        })
        return puzzle
    }

    makeGuess(guessLetter){
        guessLetter=guessLetter.toLowerCase()
        const isUnique=!this.guessLetters.includes(guessLetter)
        const isWrongGuess=!this.word.includes(guessLetter)
        if(isUnique){
            this.guessLetters.push(guessLetter)
        }
        if(isUnique&&isWrongGuess){
            this.guessAllowedTimes--
        }
        this.calculateStatus()
        this.statusMessage()
    }
}
export{Hangman as default}