//const START = "start";
const WRONG = "wrong";
const RIGHT = "right";
var counter = 60;
var timeLeft = document.getElementById("counter");
timeLeft.textContent = counter;
const display = document.getElementById("panel");
var lastAnswerStatus = null;

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
  var countdown = setInterval(function () {
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
    let btnEl = document.createElement("button");
    btnEl.setAttribute("class", "button");
    btnEl.textContent = i + ". " + answer;
    var rightAnswer = obj["answer"];
    btnEl.addEventListener("click", (btn) => {
      if (answer === rightAnswer) {
        checkAnswer(RIGHT);
      } else {
        checkAnswer(WRONG);
      }
      while (questionPool.length > 0) {
        replaceChildren(
          parent,
          question(nextQuestion(questionPool), parent, lastAnswerStatus)
        );
      }
      contentGenerator(display, score());
    });
    liEl.appendChild(btnEl);
    return liEl;
  });
  return listTagged;
};

function checkAnswer(word = "") {
  lastAnswerStatus = word;
}

var question = function (myQuestion, parent, lastAnswer) {
  //let myQuestion = obj;
  //if ((answer = WRONG)) {
  //  counter = counter - 5;
  //}
  var contentSubtitle = document.createElement("h2");
  contentSubtitle.setAttribute("class", "question");
  contentSubtitle.setAttribute("class", "title");
  contentSubtitle.textContent = myQuestion["question"];

  var contentList = document.createElement("ul");
  contentList.setAttribute("class", "answers");
  appendList(contentList, toBtnListItem(myQuestion, parent));

  var divEl = document.createElement("div");
  divEl.setAttribute("class", "ghost");

  var contentChecker = checkAnswer(lastAnswer);
  divEl.appendChild(contentChecker);

  let myContents = [contentSubtitle, contentList, contentChecker];
  return myContents;
};

var score = function () {
  var contentSubtitle = document.createElement("h2");
  var contentParagraph = document.createElement("p");
  var contentForm = document.createElement("div");
  var contentInstruction = document.createElement("h5");
  var contentPlayerInput = document.createElement("input");
  var contentButton = document.createElement("button");
  let formElements = [contentInstruction, contentPlayerInput, contentButton];
  appendList(contentForm, formElements);
  var contentChecker = document.createElement("h4");
  let myContents = [
    contentSubtitle,
    contentParagraph,
    contentForm,
    contentChecker,
  ];
  return myContents;
};
//var contentSubtitle = document.createElement("h2");
//var contentList = document.createElement("ol");
//var contentChecker = document.createElement("h4");
//var contentPlayerInput = document.createElement("input");
//var contentInstruction = document.createElement("h5");
//var contentShow = document.createElement("ol");

contentGenerator(display, splashContainer());

function checkAnswer(lastAnswer) {
  var contentChecker = document.createElement("h4");
  contentChecker.setAttribute("id", "#checker");
  contentChecker.textContent = lastAnswer;
  return contentChecker;
}
//splashContainer();
//display("start");

//var countdown = setInterval(function () {
//  if (counter >= 0) {
//    timeLeft.textContent = counter;
//    counter--;
//  } else {
//    clearInterval(countdown);
//    alert("Your time is over!");
//  }
//}, 1000);

//countdown();
