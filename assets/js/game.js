$(document).ready(function() {

// https://opentdb.com/api_config.php

  var game = {
    isPlaying: false,
    questionAmt: 10,
    correct: 0,
    wrong: 0,

    // get number of questions
    start: function() {
      game.isPlaying = true;
      console.log(game.questionAmt);
    },
    // game reset function
    reset: function() {
      game.isPlaying = false;
      questions = 10;
      correct = 0;
      wrong = 0;
      $(".game").hide();
      $(".init").show();
    }
  }

  if (game.isPlaying == false) {
    $(".game").hide();
    $(".init").show();
  }

  $("#start").on('click', function() {
    $(".game").show();
    $(".init").hide();
  });

});
