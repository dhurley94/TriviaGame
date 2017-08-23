$(document).ready(function() {

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  // set timeout and intervalids
  var intervalId;
  var timeoutId;

  var game = {
    // declare variables
    "isPlaying": false,
    "questionAmt": 10,
    "questionPos": 0,
    "correct": 0,
    "wrong": 0,
    "time": 30000,
    "questions": [],
    "answersArr": [],
    "timeOutDOM": 30,
    "outOfTime": 0,

    // start game
    start: function() {
      game.isPlaying = true;
      // get value in form
      game.questionAmt = $("#initNum").val();
      // each question gets 30 seconds
      game.time *= game.questionAmt;
      console.log("User selected " + game.questionAmt + " questions and has " + game.time / 1000 + " seconds to complete.");
      $(".game").show();
      $(".init").hide();
      $(".startover").hide();
      // get questions based on user input from form
      game.getQuestions(game.questionAmt);
    },
    getQuestions: function(loop) {
      /*
      * pulls amount of questions
      * based on user input on first page
      * assigns it to local game variable
      */
      $.getJSON('https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=medium&type=multiple', function(data) {
          game.questions = data.results;
          game.displayQuestion();
      });
    },
    displayQuestion: function() {
      // update DOM
      game.updateScore();

      if (game.questionPos == game.questions.length) {
        game.completed();
      } else {
        // log postion vs array question length
        console.log(game.questionPos + " : " + game.questions.length)

        console.log(game.questionPos + " : " +  game.questions[game.questionPos].question);
        // set incorrect_answers and answer to one array
        game.answersArr = game.questions[game.questionPos].incorrect_answers;
        game.answersArr.push(game.questions[game.questionPos].correct_answer);
        // shuffle order
        game.shuffle(game.answersArr);

        console.log(game.answersArr);
        console.log("Answer: " + game.questions[game.questionPos].correct_answer)

        // update DOM
        $(".remain").text((game.questionPos + 1) + " / " + game.questionAmt);
        $(".query").html(game.questions[game.questionPos].question)
        for (var i = 1; i <= 4; i++) {
          $("#radioStacked" + i).prop('value', game.answersArr[i-1]);
          $(".custom-control-description" + i).html(game.answersArr[i-1]);
        }

        console.log("Correct: " + game.correct + "  Wrong: " + game.wrong);

        intervalId = setInterval(game.updateTimer, 1000);
        timeoutId = setTimeout(game.timesUp, 29000);
      }
    },
    timesUp: function() {
      console.log("Ranout of time!");
      // clear interval and timeout for time tracking
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      // increment failed to answer
      game.wrong++;
      //game.displayIMG(false);
      // reset DOM timer
      game.timeOutDOM = 30;
      game.outOfTime++;
      // reset question array
      game.answersArr = [];
      // increment question position
      game.questionPos++;
      // show next question
      if (game.questionPos == game.questions.length) {
        game.completed();
      } else {
        //game.displayIMG(false);
        game.displayQuestion();
      }

    },
    updateTimer: function() {
      $(".timer").text(game.timeOutDOM);
      game.timeOutDOM--;
    },
    updateScore: function() {
      // update DOM w/ scores
      $("#wrong").text(game.wrong);
      $("#correct").text(game.correct);
    },
    resetGame: function() {
      // reset all variables
      game.isPlaying = false;
      game.questionAmt = 10;
      game.questionPos = 0;
      game.correct = 0
      game.wrong = 0;
      game.time = 30000;
      game.questions = [];
      game.answersArr = [];
    },
    completed: function() {
      // clear interval and timeout for time tracking
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      // display startover
      $(".startover").show();
      $(".game").hide();
      $(".init").hide();
      $("#finScore").html("<h3>You got " + game.correct + " of " + (game.questions.length) +  " correct!</h3><p>You ran out of time " + game.outOfTime + " times!</p>");
    },
    shuffle: function(a) {
        /**
        * Shuffles array in place.
        */
      var j, x, i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    },
    displayIMG: function(res) {
      if (res) {
        $(".game").effect("bounce", "slow");
      } else {
        $(".game").effect("shake", "slow");
      }
    }
  }

  $("#start").on('click', function() {
    game.start();
  });
  $("#again").on('click', function() {
    game.resetGame();
    game.start();
  });
  $("#nope").on('click', function() {
    $(location).attr('href', 'http://google.com');
  });
  $("#submit").on("click", function() {
    if ($("input[name='radio-stacked']:checked").val() === game.questions[game.questionPos].correct_answer) {
      //game.displayIMG(true);
      game.correct++;
    } else {
      //game.displayIMG(false);
      game.wrong++;
    }

    // show next question
    if (game.questionPos == game.questions.length) {
      game.completed();
    } else {
      /*
      * Clear Timer
      */
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      // reset DOM timer
      game.timeOutDOM = 30;
      // Check input
      // reset question array
      game.answersArr = [];
      // increment question position
      game.questionPos++;
      game.displayQuestion();
    }
  });

  // Check if game is started
  if (game.isPlaying == false) {
    $(".init").show();
    $(".game").hide();
    $(".startover").hide();
  }

});
