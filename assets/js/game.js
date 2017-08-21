$(document).ready(function() {

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  //prevents the clock from being sped up unnecessarily
  var timerRunning = false;

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
      game.questionAmt = $("#initNum").val();
      game.time *= game.questionAmt;
      console.log("User selected " + game.questionAmt + " questions and has " + game.time / 1000 + " seconds to complete.");
      $(".game").show();
      $(".init").hide();
      $(".startover").hide();
      game.getQuestions(game.questionAmt);
    },
    getQuestions: function(loop) {
      /*
      * pulls amount of questions
      * based on user input on first page
      * assigns it to local game variable
      */
      $.getJSON('https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=easy&type=multiple', function(data) {
          game.questions = data.results;
          game.displayQuestion();
      });
    },
    displayQuestion: function() {
      game.updateScore();

      // check if questions answered equals available questions
      // done if true
      if (game.questionPos + 1 == game.questionAmt) {
        game.completed();
      }

      game.answersArr = game.questions[game.questionPos].incorrect_answers;
      game.answersArr.push(game.questions[game.questionPos].correct_answer);
      console.log(game.answersArr);
      console.log("Answer: " + game.questions[game.questionPos].correct_answer)

      $(".timer").html(game.timeConverter(game.time / 1000) + " minutes remaining.");
      $(".query").html(game.questions[game.questionPos].question)
      $("#radioStacked1").prop('value', game.answersArr[0]);
      $("#radioStacked2").prop('value', game.answersArr[1]);
      $("#radioStacked3").prop('value', game.answersArr[2]);
      $("#radioStacked4").prop('value', game.answersArr[3]);
      $('.custom-control-description1').html(game.answersArr[0]);
      $('.custom-control-description2').html(game.answersArr[1]);
      $('.custom-control-description3').html(game.answersArr[2]);
      $('.custom-control-description4').html(game.answersArr[3]);

      console.log(game.questionPos + " : " +  game.questions[game.questionPos].question);
      console.log("Correct: " + game.correct + "  Wrong: " + game.wrong);

      //setTimeout(game.timesUp(), 30000);
    },
    timesUp: function() {
      // remove 30 seconds from timer
      game.time -= 30000;
      // reset question array
      game.answersArr = [];
      // increment question position
      game.questionPos++;
      // show next question
      game.displayQuestion();
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
      }
  }

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
    game.resetGame();
    $(".container").hide();
    //window.location.replace("https://google.com");
  });
  $("#submit").on("click", function() {
    /*
    */
    if ($("input[name='radio-stacked']:checked").val() == game.questions[game.questionPos].correct_answer) {
      game.correct++;
      $(".game").hide();
      /*$(".result").fadeToggle('slow/400/fast', function() {
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
