// Javascript for Homework Assignment 5
// Trivia Game
// Rhonda Johnson

$(document).ready(function () {
    // initialize variables

    // enable the "checkAnswer" function to run on-click
    var enabled = true;

    // Constructor function for question object
    // Properties: question, array of 4 answers, correct answer, image to display
    var questionObject = function (questionArg, answersArg, correctArg, imageArg) {
        this.question = questionArg;
        this.answerArray = answersArg;
        this.correctAnswer = correctArg;
        this.image = imageArg;
    };

    // Array of question objects
    var questionArray = [
        new questionObject('On November 17, 1981, approximately 30 million Americans turned on their televisions to watch which couple get married?',
            ['Prince Andrew & Sarah Ferguson', 'Prince Charles & Diana Spencer', 'Princess Anne & Mark Phillips', 'Luke Spencer & Laura Webber'],
            'Luke Spencer & Laura Webber',
            'assets/images/question1LukeLaura.jpg'),
        new questionObject('Which of these is not the nickname of one of the ghosts featured in the Pac-Man video game?',
            ['Tinky', 'Blinky', 'Inky', 'Pinky'],
            'Tinky',
            'assets/images/question2PacMan.png'),
        new questionObject('Imelda Marcos, who in 1986 was forced into exile with her husband, Philippine President Ferdinand Marcos, was widely mocked for her collection of a rumored 7,500 what?',
            ['Teddy Bears', 'Handbags', 'Pairs of Shoes', 'Velvet Paintings'],
            'Pairs of Shoes',
            'assets/images/question3Shoes.jpg'),
        new questionObject('Which of these songs from Michael Jackson\'s legendary 1982 "Thriller" album was not released as a single?',
            ['P.Y.T. (Pretty Young Thing)', 'Baby Be Mine', 'Human Nature', 'The Girl Is Mine'],
            'Baby Be Mine',
            'assets/images/question4MichaelJackson.jpg'),
        new questionObject('According to "A Guidebook to All That Is Truly Masculine" the subtitle of a book published in 1982, real men don\'t eat what?',
            ['Tofu', 'Sushi', 'Quiche', 'Canapes'],
            'Quiche',
            'assets/images/question5Quiche.jpg'),
        new questionObject('In a July 1988 concert in East Berlin, this musician told the crowd, in German: "I\'ve come to play rock \'n\' roll for you in the hope that one day all the barriers will be torn down."',
            ['Elton John', 'Bruce Springsteen', 'Billy Joel', 'Michael Jackson'],
            'Bruce Springsteen',
            'assets/images/question6Bruce.jpg'),
        new questionObject('What \'80s sitcom largely took place inside the governor\'s mansion in an unidentified U.S. state?',
            ['Mr. Belvedere', 'Webster', 'Benson', 'Silver Spoons'],
            'Benson',
            'assets/images/question7Benson.jpg'),
        new questionObject('Cabbage Patch Kids, among the most sought-after toys of all time, were originally called what?',
            ['Little People', 'Backyard Babies', 'Turnip Tots', 'Young \'Uns'],
            'Little People',
            'assets/images/question8CabbagePatch.jpg'),
        new questionObject('Which of these movies did not win the Academy Award for Best Picture in the \'80s?',
            ['Driving Miss Daisy', 'Rain Man', 'Chariots of Fire', 'The Color Purple'],
            'The Color Purple',
            'assets/images/question9ColorPurple.jpg'),
        new questionObject('President Ronald Reagan gave out jars of which candy to White House visitors?',
            ['Jelly Bellys', 'Hershey Kisses', 'M&Ms', 'Gummi Bears'],
            'Jelly Bellys',
            'assets/images/question10JellyBellys.jpg')
    ]

    var currentObject;

    // image to display on stats page
    var lastImage = 'assets/images/Totally80s.jpg';
   
    var questionCounter = 0;                    // counter for question #
    var correctCount = 0;                       // # of correct answers
    var incorrectCount = 0;                     // # of incorrect answers
    var unansweredCount = 0;                    // # of unanswered questions
    var maxTime = 10;                           // # of seconds the player has to answer the question
    var delayTime = 4000                        // 4000 milliseconds = 4 seconds
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

    //*************************
    //  Function Definitions  *
    //*************************

    // Execute when game is done
    var gameOver = function () {
        // disable running checkAnswer function on-click
        enabled = false;

        // display start button
        startButton.css("visibility", "visible");

        // display game stats
        firstChoice.text("***    Thanks for Playing    ***");
        secondChoice.text("Correct Answers: " + correctCount);
        thirdChoice.text("Incorrect Answers: " + incorrectCount);
        fourthChoice.text("Unanswered Questions: " + unansweredCount);
        currentImage.attr("src", lastImage);
        imageContainer.removeClass("hideItem");
        startButton.text("Restart");
        timerDisplay.empty();
        showTimer.empty();
        currentMessage.empty();
        extraMessage.css("visibility", "visible");
        extraMessage.text("GAME OVER - Press Restart to Play Again");

        // reset counters for a new game
        questionCounter = 0;
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
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

        // Game Over when all questions have been displayed
        if (questionCounter == questionArray.length) {
            gameOver();
        }
        else {
            // begin the timer
            beginTimer();

            currentObject = questionArray[i];
          
            // display question and choices
            currentMessage.text(currentObject.question);
            extraMessage.text("placeholder");
            extraMessage.css("visibility", "hidden");
            firstChoice.text(currentObject.answerArray[0]);
            secondChoice.text(currentObject.answerArray[1]);
            thirdChoice.text(currentObject.answerArray[2]);
            fourthChoice.text(currentObject.answerArray[3]);
        }
    }

    // begin the timer
    function beginTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(decrement, 1000);
    }

    // execute when no time left
    function outOfTime() {
        extraMessage.text("OOPS!  TIME'S UP!");
        extraMessage.css("visibility", "visible");

        displayCorrectAnswer();

        // add 1 to count of unanswered questions
        unansweredCount++;

        // increment the question # counter
        questionCounter++;

        // stop the timer 
        stopTimer();

        // after a delay, display a new question
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
        imageContainer.removeClass('hideItem');
        currentImage.attr("src", currentObject.image);

        // display the correct answer
        firstChoice.text('Correct Answer:   ' + currentObject.correctAnswer);

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
            var playerPick = $(this).text();

            // stop the timer
            stopTimer();

            // display the correct answer and image
            displayCorrectAnswer();

            // player chose correct answer
            if (playerPick == currentObject.correctAnswer) {
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

    //*************************************************************
    //    Begin new game when player clicks Start/Restart button  *
    //*************************************************************
    startButton.click(newQuestion);

    // when player clicks on an answer, check the answer
    answerSection.on("click", "h4", checkAnswer);
})
