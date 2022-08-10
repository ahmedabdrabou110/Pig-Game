//* Strict mode
"use strict";

//! Selecting Element 
const score0Element = document.querySelector("#score--0")
const score1Element = document.querySelector("#score--1")
const dicsImage     = document.querySelector("img.dics")
const newGame     = document.querySelector("button.new-game")
const rollBtn = document.querySelector("button.roll") ;
const holdBtn = document.querySelector("button.hold") ;
const score0CurrentScore = document.querySelector("#current--0")
const score1CurrentScore = document.querySelector("#current--1")
const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

//! initialize the Pig Game 
score0Element.textContent = 0 ; 
score1Element.textContent =0 ; 
dicsImage.classList.add("hidden");

//! Options 
let currentScore = 0 ;
let currentActive= 0 ;
const scores = [0,0] ;

//! When click in roll dics button 
rollBtn.addEventListener("click" , function () {
    //* 1. Generate Random dics roll 
    let randomDisc = Math.trunc(Math.random()*6) + 1 ;
    //* 2. Display Disc Roll 
    dicsImage.classList.remove('hidden')
    dicsImage.src = `./images/disc-${randomDisc}.png`
    // console.log(dicsImage.src);
    
    //* 3. check if random equal 1 , if true => Add disc to current score 
    if(randomDisc !== 1) {
        currentScore += randomDisc ; 
        // score0CurrentScore.textContent = currentScore ; //! CHANGE LATER
        document.querySelector(`#current--${currentActive}`).textContent = currentScore ;
        
    } else {
        currentScore = 0 ;
        document.querySelector(`#current--${currentActive}`).textContent = 0 ;
        currentActive  = currentActive === 0 ? 1 : 0 ;
        player0.classList.toggle("player-active")
        player1.classList.toggle("player-active")
    }
})



holdBtn.addEventListener("click" ,function () {
    // 1. Add Current Score to total score 
    scores[currentActive] += currentScore ; 
    document.querySelector(`#score--${currentActive}`).textContent = scores[currentActive]
    document.querySelector(`#current--${currentActive}`).textContent =  0;
    // 2. check if score >= 100 => yes :- current player wins else switch player 
    if(scores[currentActive] >= 10) {
        document.querySelector(`.player--${currentActive}`).classList.add("player--winner")
    document.querySelector(`#score--${currentActive}`).textContent = `Winner`

        holdBtn.classList.add('disabled');
        rollBtn.classList.add('disabled');
        dicsImage.classList.add("hidden")
        // 3. switch the Game 
    }else{
        currentScore = 0 ; 
        document.querySelector(`#current--${currentActive}`).textContent = 0 ; 
        currentActive = currentActive === 0 ? 1 : 0 ; 
        player0.classList.toggle("player-active")
        player1.classList.toggle("player-active")
    }
})


newGame.addEventListener("click" , function () {
    holdBtn.classList.remove("disabled")
    rollBtn.classList.remove("disabled")
    document.querySelector(`.player--${currentActive}`).classList.remove("player--winner")
    document.querySelector(`#score--${currentActive}`).textContent = 0 ;
    dicsImage.classList.add("hidden")
    document.querySelector(`#current--${currentActive}`).textContent = 0;
    currentActive = 0 ; 
    currentScore = 0 ; 
})