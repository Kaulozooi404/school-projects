let rectangleWidth = 0; // Width of rectangle
let rectangleHeight = 0; // Height of rectangle
const targetRectangleWidth = 1200; // Target width
const targetRectangleHeight = 700; // Target height
const widthIncrement = 20; 
let titleOpacity = 0;
let isTitleFadeInStarted = false;
let answerMessage = ""; 
let answerMessageColor = "#000"; 
let answerMessageOpacity = 0; 

const quizQuestions = [
  {
    question: "What does 'JS' stand for in programming?",
    options: ["Java Source", "JavaScript", "JustScript", "JargonScript"],
    correctIndex: 1, // JavaScript
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Mozilla", "Netscape", "Google", "Microsoft"],
    correctIndex: 1, // Netscape
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "$"],
    correctIndex: 0, // //
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["var myVar;", "variable myVar;", "v myVar;", "let myVar;"],
    correctIndex: 3, // let myVar;
  },
  {
    question: "Which data type is NOT a primitive type in JavaScript?",
    options: ["String", "Number", "Boolean", "Class"],
    correctIndex: 3, // Class
  },
  {
    question: "What is the correct syntax to write an array in JavaScript?",
    options: ["var colors = 'red', 'green', 'blue';", "var colors = ['red', 'green', 'blue'];", "var colors = (1:'red', 2:'green', 3:'blue');", "var colors = {'red', 'green', 'blue'};"],
    correctIndex: 1, // var colors = ['red', 'green', 'blue'];
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function:myFunction()", "function myFunction()", "create myFunction()", "func myFunction()"],
    correctIndex: 1, // function myFunction()
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["*", "=", "-", "+"],
    correctIndex: 1, // =
  },
  {
    question: "How do you call a function named 'myFunction'?",
    options: ["call myFunction()", "call function myFunction()", "myFunction()", "execute myFunction()"],
    correctIndex: 2, // myFunction()
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseover", "onchange", "onclick", "onmouseclick"],
    correctIndex: 2, // onclick
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"],
    correctIndex: 2, // if (i == 5)
  },
  {
    question: "How can you add a comment in a JavaScript?",
    options: ["<!-- This is a comment -->", "// This is a comment", "' This is a comment", "** This is a comment **"],
    correctIndex: 1, // // This is a comment
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = {'red', 'green', 'blue'}"],
    correctIndex: 1, // var colors = ['red', 'green', 'blue']
  },
  {
    question: "Which method is used to remove the last element from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctIndex: 0, // pop()
  },
  {
    question: "How do you convert a string to an integer in JavaScript?",
    options: ["parseInt()", "convertInt()", "int()", "toInteger()"],
    correctIndex: 0, // parseInt()
  },
  {
    question: "Which operator is used to compare both value and type?",
    options: ["==", "===", "!=", "!=="],
    correctIndex: 1, // ===
  },
  {
    question: "What will the following code return: Boolean(10 > 9)",
    options: ["NaN", "false", "true", "undefined"],
    correctIndex: 2, // true
  },
  {
    question: "How do you write a JavaScript object?",
    options: ["var person = (firstName:'John', lastName:'Doe')", "var person = ['firstName':'John', 'lastName':'Doe']", "var person = {firstName:'John', lastName:'Doe'}", "var person = 'firstName:John, lastName:Doe'"],
    correctIndex: 2, // var person = {firstName:'John', lastName:'Doe'}
  },
  {
    question: "Which keyword is used to create a class in JavaScript?",
    options: ["function", "class", "object", "def"],
    correctIndex: 1, // class
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: ["The current function", "The global object", "The current object", "None of the above"],
    correctIndex: 2, // The current object
  },
  {
    question: "Which method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctIndex: 0, // push()
  },
];



let currentQuizQuestion = 0; // Question index
let selectedOption = ""; // Store the selected option for scoreboard
let isQuestionsVisible = false;
let score = 0; 
let answered = false; 
let timeLeft = 15; 
let timerInterval; 

function setup() {
  createCanvas(2130, 1085); 
  textAlign(CENTER, CENTER); 
  textSize(24);
  shuffle(quizQuestions, true); // Randomize the questions
  startTimer(); 
}

function draw() {
  background("#caf0f8");
  fill("#48cae4");

  // Rect animation
  if (rectangleWidth < targetRectangleWidth) {
    rectangleWidth += widthIncrement;
  }
  if (rectangleHeight < targetRectangleHeight) {
    rectangleHeight += widthIncrement;
  }

  // Draw rectangle
  let [centerX, centerY] = center(rectangleWidth, rectangleHeight);
  rect(centerX, centerY, rectangleWidth, rectangleHeight, 5);

  // Fade in title after rectangle 
  if (rectangleWidth >= targetRectangleWidth && rectangleHeight >= targetRectangleHeight) {
    isTitleFadeInStarted = true;
  }

  if (isTitleFadeInStarted) {
    titleOpacity += 5;
    titleOpacity = constrain(titleOpacity, 0, 255);
    fill(255, titleOpacity);
    textSize(48);
    text("Quizzit", width / 2, centerY + 50);

    // Display message above "Quizzit" title
    displayAnswerMessage(centerY);

    if (titleOpacity >= 255) {
      isQuestionsVisible = true;
    }
  }

  if (isQuestionsVisible) {
    displayQuizQuestion(centerX, centerY);
    displayScoreboard(); // Display the scoreboard
    displayTimer(centerX, centerY); // Display the timer
  }
}

// Display the answer message above the "Quizzit" title
function displayAnswerMessage(centerY) {
  if (answerMessage) {
    fill(answerMessageColor, answerMessageOpacity); // Use dynamic color and opacity
    textSize(32);
    text(answerMessage, width / 2, centerY - 30); // Display message 50px above the title
  }
}

function displayQuizQuestion(containerX, containerY) {
  if (quizQuestions[currentQuizQuestion]) {
    fill(0);
    textSize(24);
    let questionY = containerY + 200;
    text(quizQuestions[currentQuizQuestion].question, width / 2, questionY);

    // Loop through the options and create buttons
    for (let i = 0; i < quizQuestions[currentQuizQuestion].options.length; i++) {
      let buttonX = width / 2 - 300;
      let buttonY = containerY + 250 + i * 50;
      let optionText = quizQuestions[currentQuizQuestion].options[i];

      

  
      fill("#00b4d8");
      rect(buttonX, buttonY, 600, 40, 5);
      fill(255);
      text(optionText, buttonX + 300, buttonY + 20);

      if (mouseIsPressed && mouseX > buttonX && mouseX < buttonX + 600 && mouseY > buttonY && mouseY < buttonY + 40 && !answered) {
        selectedOption = optionText; 

        // Check selected question
        if (i === quizQuestions[currentQuizQuestion].correctIndex) {
          score++;
          answerMessage = "That's the right answer!";
          answerMessageColor = color(0, 255, 0); // Green color for correct
        } else {
          answerMessage = "Oops! That's incorrect.";
          answerMessageColor = color(255, 0, 0); // Red color for incorrect
        }

        answerMessageOpacity = 255; 
        answered = true; // mark as answered 
        setTimeout(nextQuestion, 1000); // Move to the next question after 1 second
      }
    }
  }
}


function nextQuestion() {
  currentQuizQuestion++;
  if (currentQuizQuestion >= quizQuestions.length) {
    currentQuizQuestion = 0; 
  }
  answered = false; // Reset answer
  answerMessageOpacity = 0; // Hide answer
  timeLeft = 30; // Reset timer 
  clearInterval(timerInterval); // Clear current timer
  startTimer(); 
}

// Timer countdown logic
function startTimer() {
  timerInterval = setInterval(function () {
    if (!answered) {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval); // Stop the timer
        answerMessage = "You ran out of time! The answer is incorrect.";
        answerMessageColor = color(255, 0, 0); 
        answerMessageOpacity = 255;
        answered = true; // 
        setTimeout(nextQuestion, 1000); // 
        alert("You ran out of time! The answer is incorrect.");
      }
    }
  }, 1000); // Update timer every 1s
}

// countdown timer
function displayTimer(centerX, centerY) {
  fill(0);
  textSize(32);
  text("Time left: " + timeLeft + "s", centerX + rectangleWidth / 2, centerY - 150);
}

function displayScoreboard() {
  fill(0);
  textSize(32);
  let scoreboardX = width - 200;
  let scoreboardY = height / 2;
  text("Scoreboard", scoreboardX, scoreboardY - 50);
  textSize(24);
  text("Current Score: " + score, scoreboardX, scoreboardY); 
}

// calculate center position
function center(elementWidth, elementHeight) {
  let x = (width - elementWidth) / 2;
  let y = (height - elementHeight) / 2;
  return [x, y]; // Return center xy
}
