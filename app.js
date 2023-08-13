document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const width = 28        // 28*28 = 784
    let score = 0

    // layout have 784 numbers
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    // 0 --> pac dot
    // 1 --> wall
    // 2 --> ghost-lair
    // 3 --> power pallet
    // 4 --> empty

    const squares = []

    // drawing the grid and rendering it 
    function creatBord() {
        for (let i=0; i<layout.length; i++)
        {
            const square = document.createElement("div")
            grid.appendChild(square)
            squares.push(square)        // plaing all the square in an array called squares


            // adding layout to the board
            if(layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if(layout[i] === 1){
                squares[i].classList.add("wall")
            }else if(layout[i] === 2){
                squares[i].classList.add("ghost-lair")
            }else if(layout[i] === 3){
                squares[i].classList.add("power-pellet")
            }
            
        }
    }

    creatBord()

    let pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add("pac-man")

    // move pac-man
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove("pac-man")         // removing pacman form the curernt square
                                                    // so that we can change its possition with with each arrow stroke
        
        switch(e.keyCode) {
            case 37:    // left
                if ((pacmanCurrentIndex % width)  !== 0 && !squares[pacmanCurrentIndex-1].classList.contains("wall")
                && !squares[pacmanCurrentIndex-1].classList.contains("ghost-lair"))
                    {pacmanCurrentIndex -=1;
                    }
                // if pac-man is in the left exit
                if (pacmanCurrentIndex - 1 === 363){
                    pacmanCurrentIndex = 391
                }
                break;
                
            case 38:    // up
                if((pacmanCurrentIndex - width) >= 0 && !squares[pacmanCurrentIndex-width].classList.contains("wall")
                && !squares[pacmanCurrentIndex-width].classList.contains("ghost-lair"))
                    {pacmanCurrentIndex -= width
                    break}
            case 39:    // right
                if((pacmanCurrentIndex % width) !== width -1 && !squares[pacmanCurrentIndex+1].classList.contains("wall")
                && !squares[pacmanCurrentIndex+1].classList.contains("ghost-lair"))
                    {pacmanCurrentIndex += 1;
                        }
                
                // if pac-man is in right exit
                if(pacmanCurrentIndex + 1 === 392){
                    pacmanCurrentIndex = 364
                }
                break;

            case 40:    // down
                if ((pacmanCurrentIndex + width) <= width*width && !squares[pacmanCurrentIndex+ width].classList.contains("wall")
                && !squares[pacmanCurrentIndex+width].classList.contains("ghost-lair"))
                    {pacmanCurrentIndex += width
                    break}
        }

        squares[pacmanCurrentIndex].classList.add("pac-man")

        // after each move we also what to check:
            // pacDot eaten  --> point
            // PowePeller eteen   --> power 
            // gameOver
            // chdck for win

        padDotEaten()
        powerPelletEaten()
        GameOver()
        checkForWin()
    
    }

    document.addEventListener("keyup", movePacman)


    // when pac-man eates a pac Dot
function padDotEaten() {
    if(squares[pacmanCurrentIndex].classList.contains("pac-dot"))
    {
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
    }  
}

// when the powe-pellet gets eaten by your pac-man
function powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")){
        score+= 10
        ghosts.forEach(ghost=> ghost.isScared = true)
        setTimeout(unScareGhost, 10000)
        squares[pacmanCurrentIndex].classList.remove("power-pelletr")
    }
}

// make ghost stop flashing
function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


// creating our ghost template
class Ghost {
    // constructor
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerID = NaN
        this.isScared = false
    }
}

ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500),
]

// drawing ghost onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")

    
});

// move ghost randomly
ghosts.forEach(ghost => moveGhost(ghost));

// the function to move the ghost randomly on the grid

function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]  // [left, right, up, down]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerID = setInterval(function(){
        // if the next sqaure the ghost is going to go in doest NOT contain a wall and a ghost , you can go there
        if(!squares[ghost.currentIndex + direction].classList.contains("wall") && !squares[ghost.currentIndex + direction].classList.contains("ghost"))
        {
            // you can go here
            // removing the ghost
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            // change the current index to the new safe square
            ghost.currentIndex += direction
            // redrawing the ghost to the new position
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")

            
        // else find a new direction to try
        }else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        // if the ghost is scared
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        // if the ghost is scared and pac-man runs into him then ghost is eaten by pac-man
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")){
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
        }
        
        // check if ghost runs into pac-man and  kills him
        GameOver()

    }, ghost.speed)
}

// check for game over
    // if the square the pac-man currently is in contain a ghost and ghost is not scared then pac-man dies and game over
    function GameOver(){
        if(squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost"))
            {
                // pac-man dies
                squares[pacmanCurrentIndex].classList.remove("pac-man")
                ghosts.forEach(ghost=>clearInterval(ghost.timerID))     // to make gost stop moving
                document.removeEventListener("keyup", movePacman)
                setTimeout(function(){
                    alert("Game Over!!  score: "+ scoreDisplay.innerHTML)
                    window.location.reload()
                }, 500)

                // alternate display for game over
                // scoreDisplay.innerHTML = "Game Over!"
            }
    }

    // check for winner
    function checkForWin(){
        if (score === 274) {
            // if game is won
            ghosts.forEach(ghost=>clearInterval(ghost.timerID))     // to make gost stop moving
                document.removeEventListener("keyup", movePacman)   // wont be able to move pac-man
                setTimeout(function(){
                    alert("Game Win!  score: "+ scoreDisplay.innerHTML)
                    window.location.reload()    // to reload the page by clicking ok
                }, 500)

        }
    }


})

