const questionDisplay = document.querySelector("h3");
const options = Array.from(document.querySelectorAll(".option"));
const startButton = document.querySelector("button");
let randomDigit;
let api = [];
let data;
let randomNo;
let optionsArray;

const fetchApi = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
        .then(resp => resp.json())
        .then(res => {
            res.results.map(result => {
                api.push(result);
                return api
            })
        })
}
fetchApi()
console.log(api)

const randomArray = () => {
    randomNo = Math.floor(Math.random() * api.length)
    api.forEach(item => {
        return data = api[randomNo]
    })
    api.splice(randomNo, 1)
    return data
}


const displayData = () => {
    const { question, correct_answer, incorrect_answers } = data;
    optionsArray = [correct_answer, ...incorrect_answers];

    let randomOpt = [];
    for (let i=0; i<=optionsArray.length; i++){
        if (optionsArray.length > 0) {
            randomDigit = Math.floor(Math.random() * (optionsArray.length))
            randomOpt.push(optionsArray[randomDigit])
            optionsArray.splice(randomDigit, 1)
        }
        return randomOpt;
    }

    console.log(randomOpt)
    return randomOpt
}

const generateRandomNo = () => {
    // randomDigit = Math.floor(Math.random() * (optionsArray.length-1))
    // optionsArray.splice(randomDigit, 1)
    // console.log(randomDigit)
    // return randomDigit
    displayData()
    displayData()
    displayData()

}


const checkAnswer = () => {
    options.forEach(option => {
        option.addEventListener('click', function(){
            if (option.id == data.answer) {
                console.log('correct');
            }else{
                console.log('wrong')
            }
        })
    })
}

const callBackDisplay = () => {
    randomArray()
    displayData()
    checkAnswer()
}

startButton.addEventListener('click', function(){
    callBackDisplay()
    startButton.innerHTML = 'Next Question'
})





