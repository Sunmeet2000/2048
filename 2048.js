//Reloading a new game.
function fun()
{
   location.reload()
}


//Adding an event listner.
document.addEventListener('DOMContentLoaded',() =>{
    const boardDisplay = document.querySelector('.board')
    const scoreDisplay =  document.getElementById('score')
    const highscoreDisplay = document.getElementById('highscore')
    const resultDisplay = document.getElementById('resultwin')
    const result2Display = document.getElementById('resultlose')


    let sqs = [4]         // 1D array for storing numbers.
    let arr = [2,4]      // An array for randomly picking either 2 or 4.
    let score = 0        // Variable to calculate score of user in the game.


// Session storage function for storing high score of user in one session in browser cache.
function highScore()
{
    console.log(score)
    if(sessionStorage.hscore)
    {
        if(sessionStorage.hscore < score)
        {
            sessionStorage.hscore = score               // Updating session variable value
            highscoreDisplay.innerHTML = score
            
        }
        else
        { 
            highscoreDisplay.innerHTML = sessionStorage.hscore
        }
    }
    else
    {
        sessionStorage.hscore = 0;                    // Creating session variable.
    }
}
    
    

    // Creating Board
    function board()
    {
        for(let i=0;i<4;i++)                         // Converting sqs array from 1D to 2D.
        {
            sqs[i] = []
        }
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<4;j++)
            {
                sq = document.createElement('div')            // Creating empty HTML div's.
                sq.innerHTML = ""                             
                boardDisplay.appendChild(sq)                  // Appending empty div's created to board.
                sqs[i].push(sq)                               // Initialising sqs array.
            }
        }
        generate24()                             // Calling function generate24() to initially generate 2 & 4
                                                 //at random positions on the board.
    }
    board()                                     // Calling function board() to display grid initially. 
    highScore()                                 // Calling function highScore() to initially display the high score.



    //Inserting 2 & 4 at random positions initially.
    function generate24()
    {
        let num1 = Math.floor(Math.random() * 16)
        let num2 = Math.floor(Math.random() * 16)
        let i1,j1,i2,j2
        i1 = Math.floor(num1 / 4) 
        j1 = (num1 % 4)
        i2 = Math.floor(num2 / 4)
        j2 = (num2 % 4)
        if(num1 != num2 && sqs[i1][j1].innerHTML == "" && sqs[i2][j2].innerHTML == "")
        {
            sqs[i1][j1].innerHTML = 2
            sqs[i2][j2].innerHTML = 4
        }
        else
          generate24()                                       
    }



    //Inserting 2 or 4 at a random position after user gives input to move.
    function generate()
    {
        let num1 = Math.floor(Math.random() * 16)
        let i,j
        i = Math.floor(num1 / 4)
        j = (num1 % 4)
        if(sqs[i][j].innerHTML == "")
        {
            let num2 = Math.floor(Math.random() * 2)
            sqs[i][j].innerHTML = arr[num2]
            checkForGameOver()                       //Calling function checkForGameOver() for checking if no tile
                                                     //left for inserting new tile in the board.
        }
        else
          generate()
    }



    //Moving Right
    function rightmove()
    {
        for(let i=0;i<4;i++)
        {
                let a = (sqs[i][0].innerHTML == "") ? 0 : (sqs[i][0].innerHTML)   //Extracting elements of row.
                let b = (sqs[i][1].innerHTML == "") ? 0 : (sqs[i][1].innerHTML)
                let c = (sqs[i][2].innerHTML == "") ? 0 : (sqs[i][2].innerHTML)
                let d = (sqs[i][3].innerHTML == "") ? 0 : (sqs[i][3].innerHTML)

                let row = [parseInt(a),parseInt(b),parseInt(c),parseInt(d)]      //Converting strings to integer type.
             
                let filterRow = row.filter(num => num)              //Removing all zero's from row array.
                let miss = 4 - filterRow.length                    //Finding how many zero's are there in row.
                let zeros = Array(miss).fill(0)                    //Creating an array with zero's.
                let newRow = zeros.concat(filterRow)              //Concatinating zero array with elements present in row.

                sqs[i][0].innerHTML = (newRow[0] == 0) ? "" : (newRow[0])         //Inserting elements back to row.
                sqs[i][1].innerHTML = (newRow[1] == 0) ? "" : (newRow[1])
                sqs[i][2].innerHTML = (newRow[2] == 0) ? "" : (newRow[2])
                sqs[i][3].innerHTML = (newRow[3] == 0) ? "" : (newRow[3])
        }      
    }



    //Moving Left
    function leftmove()
    {
        for(let i=0;i<4;i++)
        {
                let a = (sqs[i][0].innerHTML == "") ? 0 : (sqs[i][0].innerHTML)
                let b = (sqs[i][1].innerHTML == "") ? 0 : (sqs[i][1].innerHTML)
                let c = (sqs[i][2].innerHTML == "") ? 0 : (sqs[i][2].innerHTML)
                let d = (sqs[i][3].innerHTML == "") ? 0 : (sqs[i][3].innerHTML)

                let row = [parseInt(a),parseInt(b),parseInt(c),parseInt(d)]
             
                let filterRow = row.filter(num => num)
                let miss = 4 - filterRow.length
                let zeros = Array(miss).fill(0)
                let newRow = filterRow.concat(zeros)

                sqs[i][0].innerHTML = (newRow[0] == 0) ? "" : (newRow[0])
                sqs[i][1].innerHTML = (newRow[1] == 0) ? "" : (newRow[1])
                sqs[i][2].innerHTML = (newRow[2] == 0) ? "" : (newRow[2])
                sqs[i][3].innerHTML = (newRow[3] == 0) ? "" : (newRow[3])
        }      
    }


    
    //Moving Up
    function upmove()
    {
       for(let j=0;j<4;j++)
       {
            let a = (sqs[0][j].innerHTML == "") ? 0 : (sqs[0][j].innerHTML)     //Extracting elements of column.
            let b = (sqs[1][j].innerHTML == "") ? 0 : (sqs[1][j].innerHTML)
            let c = (sqs[2][j].innerHTML == "") ? 0 : (sqs[2][j].innerHTML)
            let d = (sqs[3][j].innerHTML == "") ? 0 : (sqs[3][j].innerHTML)

            let column = [parseInt(a),parseInt(b),parseInt(c),parseInt(d)]     //Converting strings to integer type.
           
            let filterColumn = column.filter(num => num)                 //Removing all zero's from column array.
            let miss = 4 - filterColumn.length                           //Finding how many zero's are there in column.
            let zeros = Array(miss).fill(0)                              //Creating an array with zero's.
            let newColumn = filterColumn.concat(zeros)                   //Concatinating zero array with elements present in column.

            sqs[0][j].innerHTML = (newColumn[0] == 0) ? "" : (newColumn[0])      //Inserting elements back to column.
            sqs[1][j].innerHTML = (newColumn[1] == 0) ? "" : (newColumn[1])
            sqs[2][j].innerHTML = (newColumn[2] == 0) ? "" : (newColumn[2])
            sqs[3][j].innerHTML = (newColumn[3] == 0) ? "" : (newColumn[3])    
       }   
    }



    //Moving Down
    function downmove()
    {
       for(let j=0;j<4;j++)
       {
            let a = (sqs[0][j].innerHTML == "") ? 0 : (sqs[0][j].innerHTML)
            let b = (sqs[1][j].innerHTML == "") ? 0 : (sqs[1][j].innerHTML)
            let c = (sqs[2][j].innerHTML == "") ? 0 : (sqs[2][j].innerHTML)
            let d = (sqs[3][j].innerHTML == "") ? 0 : (sqs[3][j].innerHTML)

            let column = [parseInt(a),parseInt(b),parseInt(c),parseInt(d)]
        
            let filterColumn = column.filter(num => num)
            let miss = 4 - filterColumn.length
            let zeros = Array(miss).fill(0)
            let newColumn = zeros.concat(filterColumn)

            sqs[0][j].innerHTML = (newColumn[0] == 0) ? "" : (newColumn[0])
            sqs[1][j].innerHTML = (newColumn[1] == 0) ? "" : (newColumn[1])
            sqs[2][j].innerHTML = (newColumn[2] == 0) ? "" : (newColumn[2])
            sqs[3][j].innerHTML = (newColumn[3] == 0) ? "" : (newColumn[3])    
       }   
    }



    //Combining(adding) Row After Right Move.
    function combinerowright()
    {
        for(let i=0;i<4;i++)
        {
            for(let j=3;j>0;j--)
            {
                if(sqs[i][j].innerHTML == sqs[i][j-1].innerHTML && sqs[i][j].innerHTML != "" && sqs[i][j-1].innerHTML != "")
                {
                    let combinedTotal = parseInt(sqs[i][j].innerHTML) + parseInt(sqs[i][j-1].innerHTML)   //Converting strings to integers and adding them.
                    sqs[i][j].innerHTML = combinedTotal
                    sqs[i][j-1].innerHTML = ""
                    score += combinedTotal                                               //Adding sum to score.
                    scoreDisplay.innerHTML = score 
                    highScore()                                //Calling function highScore() to update high score of user.
                }
            }
        }
        checkForWin()           //Calling function checkForWin().
    }



    //Combining(adding) Row After Left Move.
    function combinerowleft()
    {
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(sqs[i][j].innerHTML == sqs[i][j+1].innerHTML && sqs[i][j].innerHTML != "" && sqs[i][j+1].innerHTML != "")
                {
                    let combinedTotal = parseInt(sqs[i][j].innerHTML) + parseInt(sqs[i][j+1].innerHTML)
                    sqs[i][j].innerHTML = combinedTotal
                    sqs[i][j+1].innerHTML = ""
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                    highScore()
                }
            }
        }
        checkForWin()
    }



    //Combining(adding) Column After Up Move.
    function combineup()
    {
        for(let j=0;j<4;j++)
        {
            for(let i=0;i<3;i++)
            {
                if(sqs[i][j].innerHTML == sqs[i+1][j].innerHTML && sqs[i][j].innerHTML != "" && sqs[i+1][j].innerHTML != "")
                {
                    let combinedTotal = parseInt(sqs[i][j].innerHTML) + parseInt(sqs[i+1][j].innerHTML)
                    sqs[i][j].innerHTML = combinedTotal
                    sqs[i+1][j].innerHTML = ""
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                    highScore()
                }
            }
        }
        checkForWin()
    }



    //Combining(adding) Column After Down Move.
    function combinedown()
    {
        for(let j=0;j<4;j++)
        {
            for(let i=3;i>0;i--)
            {
                if(sqs[i][j].innerHTML == sqs[i-1][j].innerHTML && sqs[i][j].innerHTML != "" && sqs[i-1][j].innerHTML != "")
                {
                    let combinedTotal = parseInt(sqs[i][j].innerHTML) + parseInt(sqs[i-1][j].innerHTML)
                    sqs[i][j].innerHTML = combinedTotal
                    sqs[i-1][j].innerHTML = ""
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                    highScore()
                }
            }
        }
        checkForWin()
    }



    /* Function for calling various up,down,left,right move functions after user gives input to 
       move.*/
    function control(c)
    {
        if(c.keyCode === 98 || c.keyCode === 50)
        {
            keyRight()
        }
        else if(c.keyCode === 97 || c.keyCode === 49)
        {
            keyLeft()
        }
        else if(c.keyCode === 99  || c.keyCode === 51)
        {
            keyUpwards()
        }
        else if(c.keyCode === 100 || c.keyCode === 52)
        {
            keyDownwards()
        }
    }



    /* Adding EventListner for checking if user has given any input for moving left,right,up,down 
     in board or not. */
    document.addEventListener('keyup',control)



    //Function for moving right in board & adding tiles if poosible.
    function keyRight()
    {
        rightmove()
        combinerowright()
        rightmove()
        generate()      
    }
    

    
    //Function for moving left in board & adding tiles if possible.
    function keyLeft()
    {
        leftmove()
        combinerowleft()
        leftmove()
        generate()      
    }



    //Function for moving up in board & adding tiles if possible.
    function keyUpwards()
    {
        upmove()
        combineup()
        upmove()
        generate()      
    }

    
    //Function for moving down in board & adding tiles if possible.
    function keyDownwards()
    {
        downmove()
        combinedown()
        downmove()
        generate()      
    }


    //Checking if user has reached the target and has win the game.
    function checkForWin()
    {
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<4;j++)
            {
                if(sqs[i][j].innerHTML == 2048)
                {
                    resultDisplay.innerHTML = 'You Win!'
                    document.removeEventListener('keyup',control)
                }
            }

        }
    }


    //Checking if grid is full & user has lost the game.
    function checkForGameOver()
    {
        let z = 0
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<4;j++)
            {
                if(sqs[i][j].innerHTML == "")
                {
                    z++
                }
            }
        }
        if(z == 0)
        {
            result2Display.innerHTML = 'You Lose!'
            document.removeEventListener('keyup',control)
        }
    }
})