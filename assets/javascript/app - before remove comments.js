// Javascript for Homework Assignment 5
// Trivia Game
// Rhonda Johnson

$(document).ready(function () {
    // initialize variables

    // enable the "checkAnswer" to run
    var enabled = true;

    // arry of trivia questions
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
    var maxTime = 8;                            // # of seconds the player has to answer the question
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
    




    var gameOver = function () {
        enabled = false;
        console.log("questionCounter : " + questionCounter);
        console.log("correctCount: " + correctCount);
        console.log("incorrectCount: " + incorrectCount);
        console.log("unansweredCount: " + unansweredCount);

        startButton.css("visibility", "visible");

        firstChoice.text("***    Thanks for Playing    ***");
        secondChoice.text("Correct Answers: " + correctCount);
        thirdChoice.text("Incorrect Answers: " + incorrectCount);
        fourthChoice.text("Unanswered Questions: " + unansweredCount);
        currentImage.attr("src", imageArray[(imageArray.length) - 1]);
        imageContainer.removeClass("hideItem");

        questionCounter = 0;
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        startButton.text("Restart");
        timerDisplay.empty();
        showTimer.empty();
        currentMessage.empty();
        extraMessage.css("visibility", "visible");
        extraMessage.text("GAME OVER - Press Restart to Play Again");



    }
    var newQuestion = function () {
        //answerSection.on("click", "h4", checkAnswer);
        enabled = true;
        console.log("inside new question function enable = " + enabled);
        //answerSection.css("visible", "visible");
        answerSection.removeClass("hideItem");
        imageContainer.addClass("hideItem");
        startButton.css("visibility", "hidden");
        //timerRow.css("visibility", "visible");
        // answerSection.prop("disabled", false);
        timeLeft = maxTime;
        var i = questionCounter;
        timerDisplay.text("Timer: ");
        showTimer.text(timeLeft);
        //answerSection.attr("disabled", false);
        //answerSection.prop("disabled", false);


        if (questionCounter == questions.length) {
            //alert("Game OVer");
            gameOver();
            //questionCounter = 0;
            //startButton.text("Restart");
        }
        else {
            //startButton.hide();
            beginTimer();
            currentMessage.text(questions[i]);
            extraMessage.text("placeholder");
            extraMessage.css("visibility", "hidden");
            firstChoice.text(answerOne[i]);
            secondChoice.text(answerTwo[i]);
            thirdChoice.text(answerThree[i]);
            fourthChoice.text(answerFour[i]);

            //extraMessage.empty();
            //alert("before begin timer");

            //alert("after begin timer");


            //questionCounter++;
        }
    }

    function beginTimer() {
        //needed to add the next line 
        //alert("inside begin timer");
        clearInterval(timerInterval);
        timerInterval = setInterval(decrement, 1000);
    }

    function displayCorrectAnswer() {
        // Display the answer's image
        currentImage.attr("src", imageArray[questionCounter]);
        imageContainer.removeClass("hideItem");
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
            firstChoice.text("I'm screwed");
        }
        secondChoice.empty();
        thirdChoice.empty();
        fourthChoice.empty();

    }

    function outOfTime() {
        extraMessage.text("OOPS! You Ran Out of Time!");
        extraMessage.css("visibility", "visible");

        displayCorrectAnswer();

        // Display the answer's image
        // currentImage.attr("src", imageArray[questionCounter]);
        // imageContainer.removeClass("hideItem");

        // add 1 to count of unanswered questions
        unansweredCount++;
        stopTimer();

        // increment the question counter
        questionCounter++;

        // after 5 seconds, display a new question
        alert("before new question enabled = " + enabled);
        setTimeout(newQuestion, delayTime);

    }

    function decrement() {
        showTimer.text(timeLeft);

        //$("#show-number").html("<h2>" + timeLeft + "</h2>");


        if (timeLeft === 0) {
            //alert("Times Up!");
            outOfTime();
        }
        timeLeft--;
    }

    function stopTimer() {

        clearInterval(timerInterval);
    }


    function checkAnswer() {

        // alert("inside checkanswer  enabled = " + enabled);
        if (enabled) {

            // disable the checkAnswer function from running until a new question is generated
            enabled = false;

            var playerPick = $(this).attr("value");
            //answerSection.off('click');
            //timerRow.css("visibility", "hidden");   
            //Display the answer's image   
            //imageContainer.empty();  

            // stop the timer
            stopTimer();



            // set the correct image to display
            displayCorrectAnswer();
            // currentImage.attr("src", imageArray[questionCounter]);
            // imageContainer.removeClass("hideItem");


            console.log(this);
            //answerSection.prop("disabled", true);
            //alert("Answer # selected = " + playerPick + "\nquestionCounter = " + questionCounter +
            //  "\ncorrectAnswerNUmber = " + correctAnswer[questionCounter]);

            if (playerPick == correctAnswer[questionCounter]) {
                //alert("you picked the right answer. YIPPEE!!!!");
                extraMessage.text("***  FANTABULOUS - You Got This!!!  ***");
                extraMessage.css("visibility", "visible");

                // add 1 to # of correct answer count
                correctCount++;

                // // stop the timer
                // stopTimer();

                // // after 3 seconds, display a new question
                // setTimeout(newQuestion, 3000);

            }
            else {
                // alert("Booooooo, you picked the wrong answer");
                extraMessage.text("***  WRONG Answer  Too Bad! Too Sad!  ***");
                extraMessage.css("visibility", "visible");
                // add 1 to # of incorrect answer count
                incorrectCount++;

                // // stop the timer
                // stopTimer();

                // // after 5 seconds, display a new question
                // setTimeout(newQuestion, 5000);

            }



            //alert("I am in the checkanswer function");
            //answerSection.attr("disabled", true);
            //answerSection.prop("disabled", false);


            // answerSection.off("click");

            // increment questionCounter
            questionCounter++;

            // after 5 seconds, display a new question
            // alert("before new question enabled = " + enabled);

            setTimeout(newQuestion, delayTime);

        }

    };

    //answerSection.css("visible", "hidden");
    // alert("before start question enabled = " + enabled);
    startButton.click(newQuestion);
    answerSection.on("click", "h4", checkAnswer);



})
