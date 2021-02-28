//const START = "start";
const WRONG = "wrong";
const RIGHT = "right";
var counter = 60;
var timeLeft = document.getElementById("counter");
timeLeft.textContent = counter;
const display = document.getElementById("panel");
var lastAnswerStatus = null;
var countdown = null;
var score = null;

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

var questionPool = randomized(triviaQuestions);

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
  countdown = setInterval(function () {
    if (counter >= 0) {
      timeLeft.textContent = counter;
      counter--;
    } else {
      clearInterval(countdown);
      alert("Your time is over!");
    }
  }, 1000);
};

//create a function for the start page.
var splashContainer = function () {
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
        score = counter + 1;
        clearInterval(countdown);
        contentGenerator(parent, getScore());
      }
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
  contentParagraph.textContent = "Your final score is " + score;
  contentParagraph.setAttribute(
    "style",
    "display: block; marging: 15px auto 15px 0; "
  );
  var contentForm = document.createElement("div");
  contentForm.setAttribute("style", "display: block; margin: 12px auto 0 0;");
  var contentInstruction = document.createElement("h5");
  contentInstruction.textContent = "Enter Initials : ";
  contentInstruction.setAttribute(
    "style",
    "display: inline; line-height: 1.5; margin-right: 5px; font-size: 16px;"
  );
  var contentPlayerInput = document.createElement("input");
  contentPlayerInput.setAttribute(
    "style",
    "display: inline; line-height: 1.5; margin-right: 5px; font-size: 14px;"
  );
  var contentButton = document.createElement("button");
  contentButton.setAttribute("class", "button");
  contentButton.textContent = "Submit";
  contentButton.addEventListener("click", (btn) => {
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
  var div = document.createElement("div");
  div.setAttribute("class", "bottomBtns");
  var btn1 = document.createElement("button");
  contentButton.textContent = "Go Back";
  contentButton.setAttribute("class", "button");
  contentButton.setAttribute("id", "back");
  contentButton.setAttribute("style", "display: block; margin: 0 12px 0 12px;");
  var btn2 = document.createElement("button");
  contentButton.textContent = "Clear Highscores";
  contentButton.setAttribute("class", "button");
  contentButton.setAttribute("id", "reset");
  contentButton.setAttribute("style", "display: block; margin: 0 12px 0 12px;");
  let buttons = [btn1, btn2];
  appendList(div, buttons);
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
