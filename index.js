const questionDisplay = document.querySelector("h3");
const options = Array.from(document.querySelectorAll(".option"));
const startButton = document.querySelector("button");
let api = [];
let data, randomNo, optionsArray, correctAnswer;

const fetchApi = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
        .then(resp => resp.json())
        .then(res => res.results.map(result => api.push(result)))
        .catch(err => console.log("Whoops something doesn't seem right " + err))
}
fetchApi()
console.log(api)

const randomArray = () => {
    randomNo = Math.floor(Math.random() * api.length)
    api.forEach(item => (data = api[randomNo]))
    api.splice(randomNo, 1)
    return data
}

const shuffleOptions = (arr => arr.sort(() => Math.random() - 0.5))

const displayData = () => {
    const { question, correct_answer, incorrect_answers } = data;
    optionsArray = [correct_answer, ...incorrect_answers];
    correctAnswer = optionsArray[0]
    questionDisplay.textContent = question
    shuffleOptions(optionsArray)
    optionsArray.forEach((opt, i) => (options[i].textContent = optionsArray[i]))
}

const checkAnswer = () => {
    options.forEach((option, i) => {
        option.addEventListener('click', function(){
            option.textContent === correctAnswer ? 
            console.log('correct')
            :
            console.log('wrong')
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
