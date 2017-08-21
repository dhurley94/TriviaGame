$(document).ready(function() {

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  var game = {
    // declare variables
    "isPlaying": false,
    "hasQuery": false,
    "questionAmt": 10,
    "questionPos": 0,
    "correct": 0,
    "wrong": 0,
    "time": 30000,
    "questions": [],
    "answersArr": [],

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
      $(".timer").html(game.timeConverter(game.time / 1000) + " minutes remaining.");
      $.getJSON('https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=medium&type=multiple', function(data) {
          game.questions = data.results;
          game.displayQuestion();
      });
    },
    displayQuestion: function() {
      // update DOM
      game.updateScore();

      // log postion vs array question length
      console.log(game.questionPos + " : " + game.questions.length)

      // check if questions answered equals available questions
      // done if true
      if (game.questionPos == game.questions.length) {
        game.completed();
      }

      console.log(game.questionPos + " : " +  game.questions[game.questionPos].question);
      // set incorrect_answers and answer to one array
      game.answersArr = game.questions[game.questionPos].incorrect_answers;
      game.answersArr.push(game.questions[game.questionPos].correct_answer);
      // shuffle order
      game.shuffle(game.answersArr);

      console.log(game.answersArr);
      console.log("Answer: " + game.questions[game.questionPos].correct_answer)

      // update DOM
      $(".query").html(game.questions[game.questionPos].question)
      $("#radioStacked1").prop('value', game.answersArr[0]);
      $("#radioStacked2").prop('value', game.answersArr[1]);
      $("#radioStacked3").prop('value', game.answersArr[2]);
      $("#radioStacked4").prop('value', game.answersArr[3]);
      $('.custom-control-description1').html(game.answersArr[0]);
      $('.custom-control-description2').html(game.answersArr[1]);
      $('.custom-control-description3').html(game.answersArr[2]);
      $('.custom-control-description4').html(game.answersArr[3]);

      console.log("Correct: " + game.correct + "  Wrong: " + game.wrong);

    },
    timesUp: function() {
      //TODO update DOM with current time. once timeout is met display .startover
    },
    updateScore: function() {
      // update DOM w/ scores
      $("#wrong").text(game.wrong);
      $("#correct").text(game.correct);
    },
    resetGame: function() {
      // reset all variables
      game.isPlaying = false;
      game.hasQuery = false;
      game.questionAmt = 10;
      game.questionPos = 0;
      game.correct = 0
      game.wrong = 0;
      game.time = 30000;
      game.questions = [];
      game.answersArr = [];
    },
    completed: function() {
      // display startover
      $(".game").hide();
      $(".init").hide();
      $(".startover").show();
      $("#finScore").html("<h3>You got " + game.correct + " of " + (game.questions.length) +  " correct!</h3>");
    },
    timeConverter: function(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        if (minutes === 0) {
          minutes = "00";
        }
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
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
      }
  }

  //
  if (game.isPlaying == false) {
    $(".game").hide();
    $(".init").show();
    $(".startover").hide();
  }

  $("#start").on('click', function() {
    game.start();
  });
  $("#startover").on('click', function() {
    game.resetGame();
    game.start();
  });
  $("#nope").on('click', function() {
    game.isPlaying = true;
    window.location.href = "http://google.com";
  });
  $("#submit").on("click", function() {
    /*
    */
    if ($("input[name='radio-stacked']:checked").val() == game.questions[game.questionPos].correct_answer) {
      game.correct++;
      /*$(".game").hide();
      $(".result").fadeToggle('slow/400/fast', function() {
        $("#state").html("<img src='assets/img/correct.png' rel='correct answer'>")
        $(".game").show();
      });*/
    } else if ($("input[name='radio-stacked']:checked").val() != game.questions[game.questionPos].correct_answer) {
      game.wrong++;
      /*$("#result").fadeToggle('slow/400/fast', function() {
        $("#state").html("<img src='assets/img/wrong.png' rel='wrong answer'>")
      });*/
    }
    // reset question array
    game.answersArr = [];
    // increment question position
    game.questionPos++;
    // show next question
    game.displayQuestion();
  });
});
