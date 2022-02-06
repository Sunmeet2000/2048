document.addEventListener('DOMContentLoaded',() =>{
    const boardDisplay = document.querySelector('.board')

    let sqs = []

    function board()
    {
        for(let i=0;i < 16;i++)
        {
            sq = document.createElement('div')
            sq.innerHTML = ""
            boardDisplay.appendChild(sq)
            sqs.push(sq)
        }
        generate24()
    }
    board()

    //Inserting 2 & 4 at random position
    function generate24()
    {
        let num1 = Math.floor(Math.random() * 16)
        let num2 = Math.floor(Math.random() * 16)
        if(num1 != num2 && sqs[num1].innerHTML == "" && sqs[num2].innerHTML == "")
        {
            sqs[num1].innerHTML = 2
            sqs[num2].innerHTML = 4
            //checkForGameOver()
        }
        else
          generate24()
    }


    //Moving Right
    function rightmove()
    {
        for(let i=0;i<16;i++)
        {
            if(i % 4 === 0)
            {
                let One = sqs[i].innerHTML
                let Two = sqs[i+1].innerHTML
                let Three = sqs[i+2].innerHTML
                let Four = sqs[i+3].innerHTML

                let row = [parseInt(One),parseInt(Two),parseInt(Three),parseInt(Four)]
             
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                sqs[i].innerHTML = newRow[0]
                sqs[i+1].innerHTML = newRow[1]
                sqs[i+2].innerHTML = newRow[2]
                sqs[i+3].innerHTML = newRow[3]
            }
        }      
    }


    function control(e)
    {
        if(e.keyCode === 39)
        {
            keyRight()
        }

    }

})