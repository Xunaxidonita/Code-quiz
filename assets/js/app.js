//const START = "start";
const WRONG = "wrong";
const RIGHT = "right";
const hSKey = "highScoreBoard";
var scoreBoard = JSON.parse(localStorage.getItem(hSKey));
if (scoreBoard === null) {
  scoreBoard = [];
}
var counter = 60;
var timeLeft = document.getElementById("counter");
timeLeft.textContent = counter;
const display = document.getElementById("panel");
var lastAnswerStatus = null;
var countdownInterval = null;
var players = 1;

let triviaQuestions = [
  {
    question: "cual es a",
    answer: "a",
    options: ["a", "b", "c", "d"],
  },
  {
    question: "cual es b",
    answer: "b",
    options: ["a", "b", "c", "d"],
  },
  {
    question: "cual es c",
    answer: "c",
    options: ["a", "b", "c", "d"],
  },
  {
    question: "cual es d",
    answer: "d",
    options: ["a", "e", "i", "d"],
  },
  {
    question: "cual es e",
    answer: "e",
    options: ["a", "e", "o", "d"],
  },
  {
    question: "cual es u",
    answer: "u",
    options: ["a", "o", "u", "d"],
  },
  {
    question: "cual es i",
    answer: "i",
    options: ["a", "i", "c", "d"],
  },
];

// triviaQuestions = [
//   {
//     question: "Cuantos cuentos cuentas?",
//     answer: "0",
//     options: ["0", "2", "todos", "250"],
//   },
// ];

//create function to clone array in order to avoid rewriting stored data.
var cloneArray = function (array) {
  let newArray = [];
  array.forEach((Element) => newArray.push(Element));
  return newArray;
};

var aleatory = function (array) {
  var elementX = array[Math.floor(Math.random() * (array.length - 1))];
  return elementX;
};

//create a function to change order of questions and answers every time.
var randomized = function (array) {
  let array1 = cloneArray(array);
  let array2 = [];
  while (array1.length > 0) {
    let element = aleatory(array1);
    let index = array1.indexOf(element);
    array1.splice(index, 1);
    array2.push(element);
  }
  return array2;
};

var questionPool;

// create a page builder that could be called anytime.
const contentGenerator = function (x, y) {
  replaceChildren(x, y);
};

//Function that cleans the children of an HTML element.
var removeAllChildNodes = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

/**
 * Adds all elements in array to an element.
 *
 * @param {HTMLElement} obj A parent element
 * @param {HTMLElement[]} array the new children of obj
 */
var appendList = function (obj, array) {
  array.forEach((element) => obj.appendChild(element));
};

var replaceChildren = function (parent, array) {
  removeAllChildNodes(parent);
  appendList(parent, array);
};

// create a function that starts the timer.
var startCounter = function () {
  countdownInterval = setInterval(function () {
    if (counter >= 0) {
      counter--;
      timeLeft.textContent = counter;
    } else {
      clearInterval(countdownInterval);
      alert("Your time is over!");
    }
  }, 1000);
};

//create a function for the start page.
var splashContainer = function () {
  counter = 60;
  timeLeft.textContent = counter;
  lastAnswerStatus = null;

  var contentTitle = document.createElement("h1");
  contentTitle.textContent = "Coding Quiz Challenge";
  contentTitle.setAttribute("class", "title");
  contentTitle.setAttribute(
    "style",
    "margin: 35px auto 35px auto; font-size: 42px; text-align: center;"
  );
  var contentParagraph = document.createElement("p");
  contentParagraph.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by 5 seconds.";
  contentParagraph.setAttribute("id", "instructions");
  var contentButton = document.createElement("button");
  contentButton.textContent = "Start Quiz";
  contentButton.setAttribute("class", "button");
  contentButton.setAttribute("id", "Start");
  contentButton.setAttribute(
    "style",
    "display: block; margin: 35px auto 35px auto;"
  );
  contentButton.addEventListener("click", (btn) => {
    contentGenerator(display, trivia());
    startCounter();
  });
  let myContents = [contentTitle, contentParagraph, contentButton];
  return myContents;
};

//create a template for the questions to be displayed.
var trivia = function () {
  questionPool = randomized(triviaQuestions);

  var questionaire = document.createElement("div");
  questionaire.setAttribute("class", "trivia");
  let myContents = [questionaire];
  let parent = questionaire;
  replaceChildren(
    parent,
    question(nextQuestion(questionPool), parent, lastAnswerStatus)
  );
  return myContents;
};

var nextQuestion = function (array) {
  //while
  let next = array.pop();
  return next;
};

/**
 * Transforms a question object to its answers HTML
 * representation as an array of LI elements.
 *
 * @param {Object} obj
 * @param {String[]} obj.options
 * @param {String} obj.answer
 * @param {HTMLElement}
 * @return {HTMLLIElement[]}
 */
var toBtnListItem = function (obj, parent) {
  var options = randomized(obj["options"]);
  var listTagged = options.map((answer, index) => {
    let i = index + 1;
    let liEl = document.createElement("li");
    liEl.setAttribute("class", "listEl");
    let btnEl = document.createElement("button");
    btnEl.setAttribute("class", "button");
    btnEl.setAttribute("style", "margin: 4px;");
    btnEl.textContent = i + ". " + answer;
    var rightAnswer = obj["answer"];
    btnEl.addEventListener("click", (btn) => {
      if (answer === rightAnswer) {
        setAnswer(RIGHT);
      } else {
        setAnswer(WRONG);
      }
      if (questionPool.length > 0) {
        replaceChildren(
          parent,
          question(nextQuestion(questionPool), parent, lastAnswerStatus)
        );
      } else {
        clearInterval(countdownInterval);
        contentGenerator(parent, getScore());
      }

      setTimeout(function () {
        var toErase = document.getElementById("checker");
        if (toErase) {
          toErase.parentNode.removeChild(toErase);
        }
      }, 1300);
    });
    liEl.appendChild(btnEl);
    return liEl;
  });
  return listTagged;
};

function setAnswer(word = "") {
  lastAnswerStatus = word;
}

var question = function (myQuestion, parent, lastAnswerStatus) {
  if (lastAnswerStatus === WRONG) {
    counter = counter - 5;
    timeLeft.textContent = counter;
  }

  var contentSubtitle = document.createElement("h2");
  contentSubtitle.setAttribute("class", "question");
  contentSubtitle.setAttribute("class", "title");
  contentSubtitle.setAttribute(
    "style",
    "margin: 35px auto 35px auto; font-size: 34px; text-align: left;"
  );
  contentSubtitle.textContent = myQuestion["question"];

  var contentList = document.createElement("ul");
  contentList.setAttribute("class", "answers");
  appendList(contentList, toBtnListItem(myQuestion, parent));

  var divEl = document.createElement("div");
  divEl.setAttribute("class", "ghost");

  var contentChecker = checkAnswer();
  divEl.appendChild(contentChecker);

  let myContents = [contentSubtitle, contentList, contentChecker];
  return myContents;
};

var getScore = function () {
  var contentSubtitle = document.createElement("h2");
  contentSubtitle.setAttribute("class", "question");
  contentSubtitle.setAttribute("class", "title");
  contentSubtitle.setAttribute(
    "style",
    "margin: 35px auto 35px auto; font-size: 34px; text-align: left;"
  );
  contentSubtitle.textContent = "All done!";

  var contentParagraph = document.createElement("p");
  contentParagraph.textContent = "Your final score is " + getFinalScore();
  contentParagraph.setAttribute(
    "style",
    "display: block; marging: 12px auto 18px 0; "
  );
  var contentForm = document.createElement("div");
  contentForm.setAttribute(
    "style",
    "display: block; margin: 12px auto 12px 0;"
  );
  var contentInstruction = document.createElement("h5");
  contentInstruction.textContent = "Enter Initials : ";
  contentInstruction.setAttribute(
    "style",
    "display: inline; line-height: 1.5; margin-right: 5px; font-size: 16px;"
  );
  var contentPlayerInput = document.createElement("input");
  contentPlayerInput.setAttribute(
    "style",
    "display: inline; line-height: 1.5; margin-right: 8px; font-size: 14px;"
  );
  var contentButton = document.createElement("button");
  contentButton.setAttribute("class", "button");
  contentButton.textContent = "Submit";
  contentButton.addEventListener("click", (btn) => {
    let playerInitials = contentPlayerInput.value;
    let playerScore = getFinalScore();
    var topPlayer = { player: playerInitials, score: playerScore };
    scoreBoard.push(topPlayer);
    scoreBoard.sort((a, b) => b.score - a.score);
    scoreBoard = scoreBoard.slice(0, 5);
    let passPlayer = JSON.stringify(scoreBoard);
    localStorage.setItem(hSKey, passPlayer);
    contentGenerator(display, highScores());
  });
  let formElements = [contentInstruction, contentPlayerInput, contentButton];
  appendList(contentForm, formElements);

  var divEl = document.createElement("div");
  divEl.setAttribute("class", "ghost");

  var contentChecker = checkAnswer();
  divEl.appendChild(contentChecker);

  let myContents = [contentSubtitle, contentParagraph, contentForm, divEl];
  return myContents;
};

var highScores = function () {
  var contentTitle = document.createElement("h1");
  contentTitle.textContent = "Highscores";
  contentTitle.setAttribute("class", "title");
  contentTitle.setAttribute(
    "style",
    "margin: 35px auto 35px auto; font-size: 42px; text-align: center;"
  );
  var contentShow = document.createElement("ol");
  contentShow.setAttribute("class", "board");
  var best5 = mapHighScores(scoreBoard);
  appendList(contentShow, best5);
  var btnBar = document.createElement("div");
  btnBar.setAttribute("class", "bottomBtns");
  var btn1 = document.createElement("button");
  btn1.textContent = "Go Back";
  btn1.setAttribute("class", "button");
  btn1.setAttribute("id", "back");
  btn1.addEventListener("click", (btn) => {
    contentGenerator(display, splashContainer());
  });
  //btn1.setAttribute("style", "display: block; margin: 0 12px 0 12px;");
  var btn2 = document.createElement("button");
  btn2.textContent = "Clear Highscores";
  btn2.setAttribute("class", "button");
  btn2.setAttribute("id", "reset");
  btn2.addEventListener("click", (btn) => {
    localStorage.clear();
    scoreBoard = [];
    contentGenerator(display, highScores());
  });
  //btn2.setAttribute("style", "display: block; margin: 0 12px 0 12px;");
  let buttons = [btn1, btn2];
  appendList(btnBar, buttons);
  let myContents = [contentTitle, contentShow, btnBar];
  return myContents;
};

contentGenerator(display, splashContainer());

function checkAnswer() {
  if (lastAnswerStatus === null) {
    lastAnswerChecked = "";
  } else {
    lastAnswerChecked = lastAnswerStatus + "!";
  }
  var contentChecker = document.createElement("h4");
  contentChecker.setAttribute("id", "checker");
  contentChecker.textContent = lastAnswerChecked;
  return contentChecker;
}

var getFinalScore = () => {
  return counter;
};

/**
 * Maps highscore list to a list of li elements
 * @param {*} array
 */
var mapHighScores = function (array) {
  return array.map((highscore) => {
    let liEl = document.createElement("li");
    liEl.textContent = highscore.player;
    liEl.setAttribute("class", "score");
    let spanEl = document.createElement("span");
    spanEl.textContent = highscore.score;
    spanEl.setAttribute("class", "right-aligned");
    liEl.appendChild(spanEl);
    return liEl;
  });
};
