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

    // start game
    start: function() {
      game.isPlaying = true;
      game.questionAmt = $("#initNum").val();
      game.time = game.time * game.questionAmt;
      console.log("User selected " + game.questionAmt + " questions and has " + game.time / 1000 + " seconds to complete.");
      $(".game").show();
      $(".init").hide();
      game.getQuestions(game.questionAmt);
      game.displayQuestion();
    },
    getQuestions: function(loop) {
      /*
      * pulls amount of questions
      * based on user input on first page
      * assigns it to local game variable
      */
      $.getJSON('https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=easy&type=multiple', function(data) {
          game.questions.push(data.results);
      });
    },
    displayQuestion: function() {
      setTimeout(function() {
        console.log(game.questions)
      }, 1000);
    }
  }

  if (game.isPlaying == false) {
    $(".game").hide();
    $(".init").show();
  }

  $("#start").on('click', function() {
    game.start();
  });

});
