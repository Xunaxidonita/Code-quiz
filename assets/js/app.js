//const START = "start";
var counter = 60;
var timeLeft = document.getElementById("counter");
timeLeft.textContent = counter;
const display = document.getElementById("panel");
const contentGenerator = function (x, y) {
  replaceChildren(x, y);
};

var removeAllChildNodes = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

var replaceChildren = function (parent, array) {
  removeAllChildNodes(parent);
  for (let i = 0; i < array.length; i++) {
    let child = array[i];
    parent.appendChild(child);
  }
};

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

var splashContainer = function () {
  //var contentGenerator = document.getElementById("#panel");
  var contentTitle = document.createElement("h1");
  contentTitle.textContent = "Coding Quiz Challenge";
  contentTitle.setAttribute("class", "title");
  contentTitle.setAttribute(
    "style",
    "margin: 35px auto 35px auto; font-size: 42px; text-align: center;"
  );
  var contentParagraph = document.createElement("p");
  contentParagraph.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds.";
  contentParagraph.setAttribute("id", "instructions");
  var contentButton = document.createElement("button");
  contentButton.textContent = "Start Quiz";
  contentButton.setAttribute("class", "button");
  contentButton.setAttribute("id", "Start");
  contentButton.setAttribute(
    "style",
    "display: block; margin: 35px auto 35px auto;"
  );
  contentButton.addEventListener("click", startCounter);
  let myContents = [contentTitle, contentParagraph, contentButton];
  return myContents;
};

var trivia = function () {
  var questionaire = document.createElement("div");
  questionaire.setAttribute("class", "trivia");
  let myContents = [questionaire];
};

var question = function (obj) {
  var contentSubtitle = document.createElement("h2");
  contentSubtitle.setAttribute("class", "question");
  contentSubtitle.textContent = obj["question"];
  var contentList = document.createElement("ol");
  contentList.setAttribute("class", "answers");
  var options = randomized(obj["options"]);
  options.forEach((Element) => {
    let option = document.createElement("li");
    option.textContent(Element);
    option.setAttribute("class", "button");
    //if ()
    contentList.appendChild(option);
  });
  var rightAnswer = obj["answer"];
  var contentChecker = document.createElement("h4");
  contentChecker.setAttribute("id", "#checker");
  contentChecker.setAttribute("class", "ghost");
};
var contentSubtitle = document.createElement("h2");
var contentList = document.createElement("ol");
var contentChecker = document.createElement("h4");
var contentPlayerInput = document.createElement("input");
var contentInstruction = document.createElement("h5");
var contentShow = document.createElement("ol");

//var options =

var cloneArray = function (array) {
  let newArray = [];
  array.forEach((Element) => newArray.append(Element));
  return newArray;
};

var randomized = function (array) {
  let array1 = cloneArray(array);
  let array2 = [];
  while (array1.lenght > 0) {
    array2.append(array1[Math.floor(Math.random() * array1.lenght - 1)]);
  }
  return array2;
};
contentGenerator(display, splashContainer());
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

const triviaQuestions = [
  {
    question: "",
    answer: "",
    options: [],
  },
  {
    question: "",
    answer: "",
    options: [],
  },
  {
    question: "",
    answer: "",
    options: [],
  },
  {
    question: "",
    answer: "",
    options: [],
  },
  {
    question: "",
    answer: "",
    options: [],
  },
  {
    question: "",
    answer: "",
    options: [],
  },
  {
    question: "",
    answer: "",
    options: [],
  },
];
