// Javascript for Homework Assignment 5
// Trivia Game
// Rhonda Johnson

$(document).ready(function () {
    // initialize variables

    // enable the "checkAnswer" to run
    var enabled = true;

    // array of trivia questions
    var questions = [
        'On November 17, 1981, approximately 30 million Americans turned on their televisions to watch which couple get married?',
        'Which of these is not the nickname of one of the ghosts featured in the Pac-Man video game?',
        'Imelda Marcos, who in 1986 was forced into exile with her husband, Philippine President Ferdinand Marcos, was widely mocked for her collection of a rumored 7,500 what?',
        'Which of these songs from Michael Jackson\'s legendary 1982 "Thriller" album was not released as a single?',
        'According to "A Guidebook to All That Is Truly Masculine" the subtitle of a book published in 1982, real men don\'t eat what?',
        'In a July 1988 concert in East Berlin, this musician told the crowd, in German: "I\'ve come to play rock \'n\' roll for you in the hope that one day all the barriers will be torn down."',
        'What \'80s sitcom largely took place inside the governor\'s mansion in an unidentified U.S. state?',
        'Cabbage Patch Kids, among the most sought-after toys of all time, were originally called what?',
        'Which of these movies did not win the Academy Award for Best Picture in the \'80s?',
        'President Ronald Reagan gave out jars of which candy to White House visitors?'
    ];

    // array of images for the trivia answers
    var imageArray = [
        'assets/images/question1LukeLaura.jpg',
        'assets/images/question2PacMan.png',
        'assets/images/question3Shoes.jpg',
        'assets/images/question4MichaelJackson.jpg',
        'assets/images/question5Quiche.jpg',
        'assets/images/question6Bruce.jpg',
        'assets/images/question7Benson.jpg',
        'assets/images/question8CabbagePatch.jpg',
        'assets/images/question9ColorPurple.jpg',
        'assets/images/question10JellyBellys.jpg',
        'assets/images/question11KristinShepard.jpg',
        'assets/images/Totally80s.jpg'];

    //  key for the correct answer choices
    correctAnswer = ["4", "1", "3", "2", "3", "2", "3", "1", "4", "1"];

    // array of answers
    answerOne = ['Prince Andrew & Sarah Ferguson', 'Tinky', 'Teddy Bears', 'P.Y.T. (Pretty Young Thing)', 'Tofu', 'Elton John', 'Mr. Belvedere', 'Little People', 'Driving Miss Daisy', 'Jelly Bellys'];
    answerTwo = ['Prince Charles & Diana Spencer', 'Blinky', 'Handbags', 'Baby Be Mine', 'Sushi', 'Bruce Springsteen', 'Webster', 'Backyard Babies', 'Rain Man', 'Hershey Kisses'];
    answerThree = ['Princess Anne & Mark Phillips', 'Inky', 'Pairs of Shoes', 'Human Nature', 'Quiche', 'Billy Joel', 'Benson', 'Turnip Tots', 'Chariots of Fire', 'M&Ms'];
    answerFour = ['Luke Spencer & Laura Webber', 'Pinky', 'Velvet Paintings', 'The Girl Is Mine', 'Canapes', 'Michael Jackson', 'Silver Spoons', 'Young \'Uns', 'The Color Purple', 'Gummi Bears'];

    var questionCounter = 0;                    // counter for question #
    var correctCount = 0;                       // # of correct answers
    var incorrectCount = 0;                     // # of incorrect answers
    var unansweredCount = 0;                    // # of unanswered questions
    var maxTime = 10;                           // # of seconds the player has to answer the question
    var delayTime = 5000                        // 5000 milliseconds = 5 seconds
    var timeLeft;                               // seconds left on the imter
    var timerInterval;                          // interval for the timer


    // set jQuery variables
    var startButton = $("#startButton");
    var timerDisplay = $("#timerDisplay");
    var timerRow = $("#timerRow");
    var showTimer = $("#showTimer");
    var currentMessage = $("#currentMessage");
    var extraMessage = $("#extraMessage");
    var firstChoice = $("#firstChoice");
    var secondChoice = $("#secondChoice");
    var thirdChoice = $("#thirdChoice");
    var fourthChoice = $("#fourthChoice");
    var answerSection = $("#answerSection");
    var imageContainer = $("#imageContainer");
    var currentImage = $("#currentImage");




    // Execute when game is done
    var gameOver = function () {
        // disable running checkAnswer function on-click
        enabled = false;

        // display start button
        startButton.css("visibility", "visible");

        // reset counters for a new game
        questionCounter = 0;
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;

        // display game stats
        firstChoice.text("***    Thanks for Playing    ***");
        secondChoice.text("Correct Answers: " + correctCount);
        thirdChoice.text("Incorrect Answers: " + incorrectCount);
        fourthChoice.text("Unanswered Questions: " + unansweredCount);
        currentImage.attr("src", imageArray[(imageArray.length) - 1]);
        imageContainer.removeClass("hideItem");
        startButton.text("Restart");
        timerDisplay.empty();
        showTimer.empty();
        currentMessage.empty();
        extraMessage.css("visibility", "visible");
        extraMessage.text("GAME OVER - Press Restart to Play Again");
    }

    // execute when need a new question
    var newQuestion = function () {
        // enable on-click to run checkAnswer function
        enabled = true;

        // set variables
        timeLeft = maxTime;
        var i = questionCounter;

        // allow questions to display
        answerSection.removeClass("hideItem");

        // hide start button and image
        imageContainer.addClass("hideItem");
        startButton.css("visibility", "hidden");

        // display timer area
        timerDisplay.text("Timer: ");
        showTimer.text(timeLeft);

        // Game Over when used all questions
        if (questionCounter == questions.length) {
            gameOver();

        }
        else {
            // begin the timer
            beginTimer();

            // display question and choices
            currentMessage.text(questions[i]);
            extraMessage.text("placeholder");
            extraMessage.css("visibility", "hidden");
            firstChoice.text(answerOne[i]);
            secondChoice.text(answerTwo[i]);
            thirdChoice.text(answerThree[i]);
            fourthChoice.text(answerFour[i]);
        }
    }

    // begin the timer
    function beginTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(decrement, 1000);
    }

    // execute when no time left
    function outOfTime() {
        extraMessage.text("OOPS! You Ran Out of Time!");
        extraMessage.css("visibility", "visible");

        displayCorrectAnswer();

        // add 1 to count of unanswered questions
        unansweredCount++;

        // increment the question counter
        questionCounter++;

        // stop the timer 
        stopTimer();

        // after 5 seconds, display a new question
        setTimeout(newQuestion, delayTime);
    }

    // timer counts down by 1 second
    function decrement() {
        showTimer.text(timeLeft);

        // check if player out of time
        if (timeLeft === 0) {
            outOfTime();
        }
        timeLeft--;
    }

    // stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    function displayCorrectAnswer() {
        // Display the answer's image
        currentImage.attr("src", imageArray[questionCounter]);
        imageContainer.removeClass("hideItem");

        // find which answer is correct and display the correct answer
        var temp = correctAnswer[questionCounter];

        if (temp == 1) {
            firstChoice.text(answerOne[questionCounter]);
        }
        else if (temp == 2) {
            firstChoice.text(answerTwo[questionCounter]);
        }
        else if (temp == 3) {
            firstChoice.text(answerThree[questionCounter]);
        }
        else if (temp == 4) {
            firstChoice.text(answerFour[questionCounter]);
        }
        else {
            firstChoice.text("Error Handler - Programmed incorrectly");
        }

        // clear other text
        secondChoice.empty();
        thirdChoice.empty();
        fourthChoice.empty();
    }

    // on-click, check if player selected the correct answer
    function checkAnswer() {

        // if on-click is permitted, check if player selected the correct answer
        if (enabled) {

            // disable the checkAnswer function from running until a new question is generated
            enabled = false;

            // answer chosen by the player
            var playerPick = $(this).attr("value");

            // stop the timer
            stopTimer();

            // display the correct answer and image
            displayCorrectAnswer();

            // player chose correct answer
            if (playerPick == correctAnswer[questionCounter]) {
                // display message to the player
                extraMessage.text("***  FANTABULOUS - You Got This!!!  ***");
                extraMessage.css("visibility", "visible");

                // add 1 to # of correct answer count
                correctCount++;
            }

            // player chose incorrect answer
            else {
                // display message to the player
                extraMessage.text("***  WRONG Answer - Too Bad! Too Sad!  ***");
                extraMessage.css("visibility", "visible");

                // add 1 to # of incorrect answer count
                incorrectCount++;
            }

            // increment questionCounter
            questionCounter++;

            // after 5 seconds, display a new question
            setTimeout(newQuestion, delayTime);

        }

    };

    //*********************************
    //    Begin new game when player clicks Start/Restart button
    startButton.click(newQuestion);

    // when player clicks on selection, check the answer
    answerSection.on("click", "h4", checkAnswer);
})
