$(document).ready(function() {

  $("#start").on('click', function() {
    game.start();
  });

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  var game = {
    isPlaying: false,
    questionAmt: 10,
    correct: 0,
    wrong: 0,
    time: 0,
    questions: [],
    // start game
    start: function() {
      game.isPlaying = true;
      game.questionAmt = $("#initNum").val();
      console.log("User selected " + game.questionAmt + " of Questions");
      $(".game").show();
      $(".init").hide();
      game.getQuestions(game.questionAmt);
    },
    // game reset function
    reset: function() {
      game.isPlaying = false;
      game.questions = 10;
      game.correct = 0;
      game.wrong = 0;
      $(".game").hide();
      $(".init").show();
    },
    getQuestions: function(loop) {
      /*
      * pulls 'loop' amount of questions
      * based on user input on first page
      */
      $.ajax({
        url: 'https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=easy&type=multiple',
        type: 'GET',
        success: function(data) {
          game.questions.push(data.results);
          console.log(game.questions[0]);
          console.log(game.questions[0]);
        }
      });
    }
  }

  if (game.isPlaying == false) {
    $(".game").hide();
    $(".init").show();
  }



});
