$(document).ready(function() {

// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=18&type=multiple

  var triviaGame = {
    isPlaying: false,
    hasQuery: false,
    questionAmt: 10,
    questionPos: 0,
    correct: 0,
    wrong: 0,
    time: 30000,
    questionArray: []
  }

  //start game
  function start() {
    triviaGame.isPlaying = true;
    triviaGame.questionAmt = $("#initNum").val();
    triviaGame.time = triviaGame.time * triviaGame.questionAmt;
    console.log("User selected " + triviaGame.questionAmt + " questions and has " + triviaGame.time / 1000 + " seconds to complete.");
    $(".game").show();
    $(".init").hide();
    triviaGame.questionArray = getQuestions(triviaGame.questionAmt);
    displayQuestions();
  }

  function getQuestions(loop){
    $.getJSON('https://opentdb.com/api.php?amount=' + String(loop) + '&category=18&difficulty=easy&type=multiple', function(data) {
        triviaGame.hasQuery = true;
        return data.results;
    });
  }

  function displayQuestions() {

    //console.log(triviaGame.questionArray[triviaGame.questionPos])
    //$(".query").html(triviaGame.questionArray[triviaGame.questionPos]);
  }


  if (triviaGame.isPlaying == false) {
    $(".game").hide();
    $(".init").show();
  }

  $("#start").on('click', function() {
    startGame();
  });

});
