// Game constants and variables
let inputDirection = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let score = 0;
let food = { x: 15, y: 20 }

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    // Updating the Snake array
    if (isCollide(snakeArr)) {
        inputDirection = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!")
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // If the snake have eaten the food then increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if(score>highScore){
            highScoreVal = score
            localStorage.setItem("highscore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score : " + highScoreVal;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        let a = 2;
        let b = 48;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // Moving the snake
    for (let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; 
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // Render and Display the Snake and Food
    // Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('snakeHead');
        }
        else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement)
    })

    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snakeFood')
    board.appendChild(foodElement)
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 } // Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
});

let highScore = localStorage.getItem("highscore");
if (highScore === null){
    highScoreVal = 0
    localStorage.setItem("highscore", JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(highScore)
    highScoreBox.innerHTML = "High Score : " + highScore;
}

function isCollide(snakeArr) {
    // If the snake bump into it self
    for(let i = 1;i<snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x >= 50 || snakeArr[0].x <= 0 || snakeArr[0].y >= 50 || snakeArr[0].y <= 0){
        return true;
    }
}