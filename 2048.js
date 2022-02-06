document.addEventListener('DOMContentLoaded',() =>{
    const boardDisplay = document.querySelector('.board')

    let sqs = []
    
    //Generating Board
    function board()
    {
        for(let i=0;i < 16;i++)
        {
            sq = document.createElement('div')
            sq.innerHTML = 0
            boardDisplay.appendChild(sq)
            sqs.push(sq)
        }
        generate24()
    }
    board()

    //Inserting 2 & 4 at random positions
    function generate24()
    { 
        let num1
        let num2
        while(1)
        {
            num1 = Math.floor(Math.random() * sqs.length)
            num2 = Math.floor(Math.random() * sqs.length)
            if(num1 != num2 && sqs[num1].innerHTML == 0 && sqs[num2].innerHTML == 0)
               break
        }

        sqs[num1].innerHTML = 2
        sqs[num2].innerHTML = 4
        //checkForGameOver()
    }
})