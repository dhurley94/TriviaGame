$(document).ready(function() {

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  var game = {
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
      game.time = game.time * game.questionAmt;
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

      $(".timer").html(parseInt((game.time / 1000) / 60) + " minutes remaining.");
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

    },
    timesUp: function() {
      //game.time -= 30000;
      game.wrong++;
      game.questionPos++
      game.displayQuestion();
    },
    updateScore: function() {
      $("#wrong").text(game.wrong);
      $("#correct").text(game.correct);
    },
    resetGame: function() {
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
      game.isPlaying = false;
      game.hasQuery = false;
      $(".game").hide();
      $(".init").hide();
      $(".startover").show();
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
    if ($("input[name='radio-stacked']:checked").val() == game.questions[game.questionPos].correct_answer) {
      game.correct++;
    } else if ($("input[name='radio-stacked']:checked").val() != game.questions[game.questionPos].correct_answer) {
      game.wrong++;
    }/* else if () {
      //TODO implement timer loss
    }*/
    game.answersArr = [];
    game.questionPos++;
    game.displayQuestion();
  });
});
