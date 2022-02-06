document.addEventListener('DOMContentLoaded',() =>{
    const boardDisplay = document.querySelector('.board')

    let sqs = []

    function board()
    {
        for(let i=0;i < 16;i++)
        {
            sq = document.createElement('div')
            sq.innerHTML = 0
            boardDisplay.appendChild(sq)
            sqs.push(sq)
        }
    }
    board()
})