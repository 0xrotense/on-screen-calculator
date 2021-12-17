function calculator () {
    let perviousText = document.querySelector('.previous')
    let currentText = document.querySelector('.current')
    const Numbuttons = Array.from(document.querySelectorAll('.num'))
    const OperationsButton = Array.from(document.querySelectorAll('.operation'))
    const deleteButton = document.querySelector('.delete')
    const clearButton = document.querySelector('.clear')
    const  equalBtn = document.querySelector('.equals')
    let currentOperand = ''
    let previousOperand = ''
    let operation = undefined

    function handleButtons() {
        Numbuttons.map(btn => {
            btn.addEventListener('click', () => {
                currentOperand === "You Can't divide by 0" ? currentOperand = '' : ''
                currentOperand === 0 ? currentOperand = " " : '';
                currentOperand = currentOperand.toString()
                if(btn.textContent === '.' && currentOperand.includes('.')) return
                currentOperand += btn.textContent.toString()
                upDateDisplay()
            })
        })

        OperationsButton.map(btn => {
            btn.addEventListener('click', () => {
                if(currentOperand ===  "") return
                operation = btn.textContent
                operate()
                upDateDisplay()
            })
        })

        deleteButton.addEventListener('click', () => {
            // "Choose a higher number bitch"
            let temp
            if(currentOperand ===  "You Can't divide by 0") {
                currentOperand = 0
                temp = currentOperand
            }else {
                temp = currentOperand.toString().slice(0, -1)
            }
            if(temp === '' || temp === 0 ) {
                temp = 0 
                currentOperand = temp
                upDateDisplay()
           } else {
                currentOperand = parseFloat(temp)
                // console.log(typeof currentOperand)
                upDateDisplay()
           }
         
        })

        equalBtn.addEventListener('click', () => {
            calculateResults()
            upDateDisplay()
        })

        clearButton.addEventListener('click', () => {
            currentOperand = 0
            previousOperand = ''
            operation = undefined
            upDateDisplay()
        })

        //adding a keyboard support
        window.addEventListener('keyup' , (e) => {
            Numbuttons.map(btn => {
                if(e.key === btn.textContent)  {
                    if(e.key === '.' && currentOperand.includes('.')) return
                    currentOperand += btn.textContent.toString()
                    upDateDisplay()
                } 
            })

            OperationsButton.map(btn => {
                if(e.key === btn.textContent)  {
                     operation = btn.textContent
                      operate()
                     upDateDisplay()
                } 
            })

            if(e.key === equalBtn.textContent) {
                   calculateResults()
                   upDateDisplay()
            }
        })
    }

    function operate() {
        if(currentOperand === ' ') return
        if(previousOperand !== ' ') {
            calculateResults()
        }
        previousOperand = `${currentOperand} ${operation}`
        currentOperand = ' '
    }


    function  calculateResults() {
        const curr = parseFloat(currentOperand)
        const prev = parseFloat(previousOperand)
        let results;

        if( isNaN(prev)  ||  isNaN(curr) ) return 
          operation === '+' ? results = prev  + curr
        : operation === '-' ? results =  prev - curr
        : operation === '*' ? results = prev * curr
        : operation === '÷' && curr === 0 ? results = "You Can't divide by 0"
        : operation === '÷' ? results = prev / curr 
        : '';
        //Math.round((results + Number.EPSILON) * 100) / 100;
        currentOperand = results
        operation = undefined
        previousOperand = ''
    }

    function upDateDisplay() {
        currentText.textContent = currentOperand
        perviousText.textContent = previousOperand
    }

    handleButtons()
}
calculator()

