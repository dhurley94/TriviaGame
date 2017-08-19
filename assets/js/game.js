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
      // set interval for amount of time rather than for loop
      // increment questionPos to keep track of position
      //
      setInterval(function() {
        $(".timer").html(parseInt((game.time / 1000) / 60) + " minutes remaining.");
        $(".query").html(game.questions[game.questionPos].question)
        console.log(game.questions[game.questionPos].question);

        var answersArr = game.questions[game.questionPos].incorrect_answers;
        answersArr.push(game.questions[game.questionPos].correct_answer);
        console.log(answersArr);

        $('.custom-control-description1').html(answersArr[0]);
        $('.custom-control-description2').html(answersArr[1]);
        $('.custom-control-description3').html(answersArr[2]);
        $('.custom-control-description4').html(answersArr[3]);

        game.questionPos++;
      }, 30000);
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
