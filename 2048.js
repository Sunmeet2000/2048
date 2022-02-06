document.addEventListener('DOMContentLoaded',() =>{
    const boardDisplay = document.querySelector('.board')
    const scoreDisplay =  document.getElementById('score')

    let sqs = []
    let score = 0
    let arr = [2,4]
    

    //Creating Board
    function board()
    {
        for(let i=0;i<4;i++)
        {
            sqs[i] = []
        }
        for(let i=0;i < 4;i++)
        {
            for(let j=0;j<4;j++)
            {
                sq = document.createElement('div')
                sq.innerHTML = 0
                boardDisplay.appendChild(sq)
                sqs[i].push(sq)
            }
        }
        generate24()
    }
    board()


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
        if(num1 != num2 && sqs[i1][j1].innerHTML == 0 && sqs[i2][j2].innerHTML == 0)
        {
            sqs[i1][j1].innerHTML = 2
            sqs[i2][j2].innerHTML = 4
            //checkForGameOver()
        }
        else
          generate24()
    }


    //Inserting 2 or 4 at a random position.
    function generate()
    {
        let num1 = Math.floor(Math.random() * 16)
        let i,j
        i = Math.floor(num1 / 4)
        j = (num1 % 4)
        if(sqs[i][j].innerHTML == 0)
        {
            let num2 = Math.floor(Math.random() * 2)
            sqs[i][j].innerHTML = arr[num2]
        }
        else
          generate()
    }


    //Moving Right
    function rightmove()
    {
        for(let i=0;i<4;i++)
        {
                let a = sqs[i][0].innerHTML
                let b = sqs[i][1].innerHTML
                let c = sqs[i][2].innerHTML
                let d = sqs[i][3].innerHTML

                let row = [parseInt(a),parseInt(b),parseInt(c),parseInt(d)]
             
                let filterRow = row.filter(num => num)
                let miss = 4 - filterRow.length
                let zeros = Array(miss).fill(0)
                let newRow = zeros.concat(filterRow)

                sqs[i][0].innerHTML = newRow[0]
                sqs[i][1].innerHTML = newRow[1]
                sqs[i][2].innerHTML = newRow[2]
                sqs[i][3].innerHTML = newRow[3]
        }      
    }

    
    //Combining Row 
    function combinerow()
    {
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(sqs[i][j].innerHTML === sqs[i][j+1].innerHTML)
                {
                    let combinedTotal = parseInt(sqs[i][j].innerHTML) + parseInt(sqs[i][j+1].innerHTML)
                    sqs[i][j].innerHTML = combinedTotal
                    sqs[i][j+1].innerHTML = 0
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }
       // checkForWin()
    }



    function control(e)
    {
        if(e.keyCode === 39)
        {
            keyRight()
        }

    }


    //Adding EventListner for checking if user has given any input or not. 
    document.addEventListener('keyup',control)



    function keyRight()
    {
        rightmove()
        combinerow()
        rightmove()
        generate()      
    }

})