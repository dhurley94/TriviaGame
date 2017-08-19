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
      //game.displayQuestion();
    },
    getQuestions: function(loop) {
      /*
      * pulls amount of questions
      * based on user input on first page
      * assigns it to local game variable
      */
      $.getJSON('https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=easy&type=multiple', function(data) {
          game.questions = data.results;
      });
    },
    displayQuestion: function() {
      console.log(game.questions)
      // set interval for amount of time rather than for loop
      // increment questionPos to keep track of position
      //
      for (var i = 1; i <= game.questionAmt; i++) {
        var answersArr = game.questions[i].incorrect_answers;
        answersArr.push(game.questions[i].correct_answer);
        console.log(answersArr);
        $(".query").text(game.questions[i].question)
        answersArr.forEach()
        //$(".custom-control-description").text
      }
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
