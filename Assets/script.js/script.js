var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var questionEl = document.getElementById('question');
var introEl = document.getElementById('intro-para');
var questionTextEl = document.getElementById("question-container");
var answersLi = document.getElementById('answer-buttons');
var resultsAnswer = document.getElementById('results');
var answerCorrect = document.getElementById('answer2')
var yourScore = document.getElementById('playerScore')

var player_container = document.getElementById('player-container');
var fname = document.getElementById('fname');

var counter;
counter = 0;

yourScore.style.display = 'none';

// questions array

var questions = [{
    question: 'Commonly used data types do not include______',
    answers: [{
        text: 'Boleans',
        correct: false
      },
      {
        text: 'Other Arrays',
        correct: false
      },
      {
        text: 'Numbers',
        correct: false
      },
      {
        text: 'Alerts',
        correct: true
      }
    ]
  },
  {
    question: 'A very useful tool used during developement and debugging for printing content to the debugger is _____.',
    answers: [{
        text: 'JavaScript',
        correct: false
      },
      {
        text: 'Terminal/Bash',
        correct: false
      },
      {
        text: 'For Loops',
        correct: false
      },
      {
        text: 'Console log',
        correct: true
      }
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store__________?',
    answers: [{
        text: 'numbers and strings',
        correct: false
      },
      {
        text: 'other arrays',
        correct: false
      },
      {
        text: 'booleans',
        correct: false
      },
      {
        text: 'all of the above',
        correct: true
      }
    ]
  },
  {
    question: 'The condition in an if/else statement is enclosed with________?',
    answers: [{
        text: 'quotes',
        correct: false
      },
      {
        text: 'curly brackets',
        correct: false
      },
      {
        text: 'parenthesis',
        correct: true
      },
      {
        text: 'square brackets',
        correct: false
      }
    ]
  },
  {
    question: 'String values in JavaScript must be inclosed in _______.',
    answers: [{
        text: 'quotes',
        correct: true
      },
      {
        text: 'curly brackets',
        correct: false
      },
      {
        text: 'parenthesis',
        correct: false
      },
      {
        text: 'square brackets',
        correct: false
      }
    ]


  }
]

// set timer

var timeLeft = 75;
var timer = document.getElementById('timer');



// time start and remaining
var timeInterval = undefined;

function countdown() {
  timeLeft = 75;
  //  timer.innerHTML = timeLeft;
  timeInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft < 0)
      timeLeft = 0;

    timer.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      onEndQuiz();
    }
    // console.log("time", timer, timeLeft)
  }, 1000);

}
current_question_num = 0;

// function to display question and answers

function displayProblem(num) {
  current_question_num = num;

  var questionText = document.getElementById("question");
  questionText.textContent = questions[num].question;

  // for loopo for questions

  for (i = 1; i < 5; i++) {
    var answerText = document.getElementById("answer" + i);
    answerText.textContent = questions[num].answers[i - 1].text;
  }
  resultsAnswer.textContent = "";
}

// function to check answers

function clicked(e) {
  console.log("click", e.target.innerHTML);

  var answers_list = questions[current_question_num].answers;

  var correct_answer = answers_list.find(function (item) {
    return item.correct;
  });

  checkTrue = e.target.innerHTML == correct_answer.text;

  //  display correct or wrong

  if (checkTrue === true) {
    console.log(questions[i]);
    resultsAnswer.textContent = "correct";
  } else {
    resultsAnswer.textContent = "Wrong";
    timeLeft -= 10;
    if (timeLeft < 0)
      timeLeft = 0;
    timer.innerHTML = timeLeft;
  }

  moveToNextProblem();
}

// load next question

function moveToNextProblem() {
  setTimeout(function () {
    if (current_question_num == questions.length - 1) {
      onEndQuiz();
      return;
    }

    // next problem 2 second delay
    timeLeft += 2;
    displayProblem(current_question_num + 1);
  }, 2000);
}

player_container.style.display = 'none';

// start the game function

function onStart() {
  introEl.classList.add('btn-hide')
  startBtn.classList.add('btn-hide');
  questionEl.classList.remove('hide');
  questionEl.style.display = 'block';
  answersLi.classList.remove('hide');
  player_container.style.display = 'none';
  yourScore.style.display = 'none';
  countdown();
  displayProblem(0);
}

// end of game and display score/timeleft

function onEndQuiz() {
  if (timeInterval)
    clearInterval(timeInterval);
  yourScore.innerHTML = "Quiz is over: Your score is  " + timeLeft;
  yourScore.style.display = 'block';

  startBtn.classList.add('btn-hide');
  questionEl.style.display = 'none';
  answersLi.classList.add('hide');
  player_container.style.display = 'block';
}

// save score and name input to localStorage

function onSaveScore() {
  var fname_str = fname.value;
  var score_info = [{
    Player: fname_str,
    Score: timeLeft
  }];

  localStorage.setItem("score", JSON.stringify(score_info));
}

// ask restart the game button 

function onRestartQuiz() {
  startBtn.classList.remove('btn-hide');
  questionEl.classList.add('hide');
  player_container.style.display = 'none';
  yourScore.style.display = 'none';
  introEl.classList.remove('btn-hide')
  timeLeft = 75;
  timer.innerHTML = timeLeft;
}

// event listeners

answer1.addEventListener("click", clicked);
answer2.addEventListener("click", clicked);
answer3.addEventListener("click", clicked);
answer4.addEventListener("click", clicked);

startBtn.addEventListener('click', onStart);