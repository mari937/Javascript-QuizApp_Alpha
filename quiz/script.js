
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let jovalaszok = 0
// Hangeffektek
var perfect = new Audio()
var roblox = new Audio()
var victory = new Audio()
var fail = new Audio()
perfect.src = "perfect.mp3"
roblox.src = "roblox.mp3"
victory.src = "victory.mp3"
fail.src = "fail.mp3"

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
	currentQuestionIndex++
	setNextQuestion()
})


function startGame() {
	jovalaszok = 0
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide');
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if(answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}


function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add('hide')
	while(answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
	document.getElementById("right-answers").innerHTML = jovalaszok
}




function selectAnswer(e) {

	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	
		if(selectedButton.dataset = correct) {
		jovalaszok++
		perfect.play()
		}
		else {
		jovalaszok--
		roblox.play()
		}
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	}
	else {
		startButton.innerText = 'Újra'
		startButton.classList.remove('hide')
		if(jovalaszok < shuffledQuestions.length) {
			fail.play()
			swal({
				title: "Ajjaj!",
				text: "Nem minden kérdésre tudtad a választ.",
				icon: "warning"
			})

		}
	}

	document.getElementById("right-answers").innerHTML = jovalaszok
		if(shuffledQuestions.length == jovalaszok) {
			victory.play()
		swal({
				title: "Gratulálok",
				text: "Minden kérdésre tudtad a választ. Jár a keksz",
				icon: "success",
				button: "Kérem a kekszet"
			}).then(function(){
				var img = document.createElement("img");
				document.body.style.backgroundImage = "url('cookie.jpg')"
				document.body.style.backgroundRepeat = "no-repeat"
				document.body.style.backgroundSize = "80% 100%"
				document.body.style.backgroundPosition = "center"
			}).catch(function(reason){
				alert("A keksz elutasítva a felhasználó által: "+reason)
			});
	}

}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if(correct) {
		element.classList.add('correct')

	}
	else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}
// Kérdések & Válaszok
const questions = [
	{
		question: "Mennyi 2 + 2 ?",
		answers: [
			{ text: '4', correct: true},
			{ text: '22', correct: false},
			{ text: 'Sok', correct: false},
			{ text: 'Nemtom', correct: false}
		]
	},
		{
		question: "Hány éves Dolák-Saly Róbert?",
		answers: [
			{ text: '65', correct: true},
			{ text: '18', correct: false},
			{ text: '100', correct: false},
			{ text: '58', correct: false}
		]
	},
	{
		question: "Mikor alapult meg a CCC?",
		answers: [
			{ text: '1989', correct: false},
			{ text: '1956', correct: false},
			{ text: '2010', correct: false},
			{ text: '1999', correct: true}
		]
	},
	{
		question: "Mi Martin beceneve?",
		answers: [
			{ text: 'Mari', correct: true},
			{ text: 'Maci', correct: true},
			{ text: 'Márton', correct: false},
			{ text: 'Pöcök', correct: false}
		]
	},
	{
		question: "Hány étterme van Kőszegnek?",
		answers: [
			{ text: '10', correct: true},
			{ text: '20', correct: false},
			{ text: '5', correct: false},
			{ text: '11', correct: false}
		]
	},
	{
		question: "Mi Gy.Bálint beceneve?",
		answers: [
			{ text: 'Béluska', correct: false},
			{ text: 'Whiskey', correct: false},
			{ text: 'Kenny Owens', correct: true},
			{ text: 'Béla', correct: true}
		]
	},
	{
		question: "Mi az iskolai végzettsége H.Péternek?",
		answers: [
			{ text: '8 általános', correct: true},
			{ text: 'Egyetemi', correct: false},
			{ text: 'Középiskolai', correct: false},
			{ text: 'Nincs végzettsége', correct: false}
		]
	},


]