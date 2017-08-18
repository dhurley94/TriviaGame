$(document).ready(function() {

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  function generateQuestions(loop) {
    /*
    * pulls 'loop' amount of questions
    * based on user input on first page
    */
    $.ajax({
      url: 'https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=easy&type=multiple',
      type: 'GET',
      success: function(data) {
        $.each(data, function(i, item){
          console.log(item);
        });
      }
    });
  }

  var game = {
    isPlaying: false,
    questionAmt: 10,
    correct: 0,
    wrong: 0,

    // get number of questions
    start: function() {
      game.isPlaying = true;
      game.questionAmt = $("#initNum").val();
      game.questions = generateQuestions(game.questionAmt);
      console.log(game.questions);
      $(".game").show();
      $(".init").hide();
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
    game.start();
  });

});
