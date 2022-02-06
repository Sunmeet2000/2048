document.addEventListener('DOMContentLoaded',() =>{
    const boardDisplay = document.querySelector('.board')

    let sqs = []
    let score = 0

    function board()
    {
        for(let i=0;i < 16;i++)
        {
            sq = document.createElement('div')
            square.innerHTML = 0
            boardDisplay.appendChild(sq)
            sqs.push(sq)
        }
    }
    board()
})