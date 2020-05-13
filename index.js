const questionDisplay = document.querySelector("h3");
const options = Array.from(document.querySelectorAll(".option-container"));
const optionsSentence = Array.from(document.querySelectorAll(".option"));
const optionsNo = document.querySelectorAll(".option-alphabet");
const startButton = document.querySelector(".btn-start");
const alphabets = ['A', 'B', 'C', 'D']
let api = [];
let isCorrect, data, randomNo, optionsArray, correctAnswer;

const fetchApi = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
        .then(resp => resp.json())
        .then(res => res.results.map(result => api.push(result)))
        .catch(err => console.log("Whoops something doesn't seem right " + err))
}

setTimeout(() => {
    fetchApi()
})

const randomArray = () => {
    randomNo = Math.floor(Math.random() * api.length)
    api.forEach(item => (data = api[randomNo]))
    api.splice(randomNo, 1)
    return data
}

const shuffleOptions = (arr => arr.sort(() => Math.random() - 0.5))

const displayData = () => {
    randomArray()
    const { question, correct_answer, incorrect_answers } = data;
    optionsArray = [correct_answer, ...incorrect_answers];
    correctAnswer = optionsArray[0]
    questionDisplay.textContent = question;
    // shuffle the options
    shuffleOptions(optionsArray)
    optionsArray.forEach((opt, i) => (optionsSentence[i].textContent = optionsArray[i])) 
    optionsNo.forEach((no, i) => (no.textContent = alphabets[i])) 
}

const checkAnswer = () => {
    options.forEach((option, i) => {
        option.addEventListener('click', function(){
            optionsSentence[i].textContent === correctAnswer ? isCorrect = true : isCorrect = false 
                setTimeout(() => {
                    isCorrect ? option.classList.remove('correct-option')
                    : option.classList.remove('wrong-option')
                }, 400, 
                    isCorrect ? option.classList.add('correct-option')
                        : (option.classList.add('wrong-option'))
                )
                resumeQuiz()
            })
        })
}

const resumeQuiz = () => {
    api.length ? 
        (setTimeout(() => { 
        displayData()
        checkAnswer()
        startButton.innerHTML = 'Skip Question'
        }, 800))
    : window.location = "end.html"
}

startButton.addEventListener('click', resumeQuiz)
