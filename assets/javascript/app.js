// Javascript for Homework Assignment 5
// Trivia Game
// Rhonda Johnson

$(document).ready(function () {
    // initialize variables
    questions = ['Question #1', 'Question #2', 'Question #3', 'Question #4'];
    correctAnswer = ['correct 1', 'correct 2', 'correct 3', 'correct 4'];
    answerOne = ['Wrong 1-1', 'correct 2', 'Wrong 3-1', 'Wrong 4-1'];
    answerTwo = ['correct 1', 'Wrong 2-2', 'Wrong 3-2', 'Wrong 4-2'];
    answerThree = ['Wrong 1-3', 'Wrong 2-3', 'Wrong 3-3', 'correct 4'];
    answerFour = ['Wrong 1-4', 'Wrong 2-4', 'correct 3', 'Wrong 4-4'];

    var questionCount = 0;
    var correctCount = 0;
    var incorrectCount = 0;
    var unansweredCount = 0;
    var startButton = $("#startButton");
    var timerDisplay = $("#timerDisplay");
    var showTimer = $("#showTimer");
    var currentMessage = $("#currentMessage");
    var extraMessage = $("#extraMessage");
    var firstChoice = $("#firstChoice");
    var secondChoice = $("#secondChoice");
    var thirdChoice = $("#thirdChoice");
    var fourthChoice = $("#fourthChoice");
    var answerSection = $("#answerSection");
    var timeLeft = -99;
    var timerInterval;
    imageArray = ['assets/images/red.png', 'assets/images/blue.png', 'assets/images/yellow.png', 'assets/images/green.png'];

    var gameOver = function () {
        console.log("questionCount : " + questionCount);
        console.log("correctCount: " + correctCount);
        console.log("incorrectCount: " + incorrectCount);
        console.log("unansweredCount: " + unansweredCount);

        startButton.css("visibility", "visible");

        firstChoice.empty();
        secondChoice.text("Correct Answers: " + correctCount);
        thirdChoice.text("Incorrect Answers: " + incorrectCount);
        fourthChoice.text("Unanswered Questions: " + unansweredCount);

        questionCount = 0;
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        startButton.text("Restart");
        timerDisplay.empty();
        showTimer.empty();
        currentMessage.empty();
        extraMessage.text("GAME OVER - Press Restart to Play Again");
        
        

    }
    var newQuestion = function () {
        console.log("inside new question function");
        startButton.css("visibility", "hidden");
        timeLeft = 10;
        var i = questionCount;
        timerDisplay.text("Timer: "); 
        answerSection.attr("disabled", false);
           

        if (questionCount == questions.length) {
            alert("Game OVer");
            gameOver();
            //questionCount = 0;
            //startButton.text("Restart");
        }
        else {
            //startButton.hide();
            currentMessage.text(questions[i]);
            firstChoice.text(answerOne[i]);
            secondChoice.text(answerTwo[i]);
            thirdChoice.text(answerThree[i]);
            fourthChoice.text(answerFour[i]);

            extraMessage.empty();

            beginTimer();


            questionCount++;
        }
    }

    function beginTimer() {
        //needed to add the next line 
        clearInterval(timerInterval);
        timerInterval = setInterval(decrement, 1000);
    }

    function outOfTime() {
        extraMessage.text("OOPS! You Ran Out of Time!");

        // add 1 to count of unanswered questions
        unansweredCount ++;
        stopTimer();

        // after 5 seconds, display a new question
        setTimeout(newQuestion, 5000);

    }

    function decrement() {
        timeLeft--;
        //$("#show-number").html("<h2>" + timeLeft + "</h2>");
        showTimer.text(timeLeft);

        if (timeLeft === 0) {
            alert("Times Up!");
            outOfTime();
        }
    }

    function stopTimer() {

        clearInterval(timerInterval);
    }

    function checkAnswer(){
        alert("I am in the checkanswer function");
        //answerSection.attr("disabled", true);

        answerSection.off("click");

    };



    startButton.click(newQuestion);
    answerSection.on("click",checkAnswer);


})
