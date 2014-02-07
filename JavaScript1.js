$(document).ready(function () {

    newGame();

    $('#guess').keypress(function (event) {
        if (event.keyCode == 13) {
            $("#submit").click();
           
            return false;
        } 
    });
    $("#submit").on('click', function () {

        var guess = $('#guess').val();

        //do some quick validation
        if (guess <= 0 || guess >= 100 || isNaN(guess)) {
            $('#invalidGuess').html("Invalid guess, please make sure you enter a guess between 1 and 100");
            $('#hotter').html("");
            $('#colder').html(""); 
        }
        else {
            checkGuess();
            $('#invalidGuess').html("");
        };
    });

    $('#new').on('click', function () {
        newGame();
    });
});

//nasty nasty global variables
var pastGuesses = [];
var lastGuess = 0;
var winningNumber = newGame;

//does the work of putting together a new game
var newGame = function () { 

    winningNumber = Math.floor((Math.random() * 100) + 1);
    console.log(winningNumber + "  hey, that's cheating!");

    clearGame();
};

var clearGame = function () {
    $('.clear').html("");
    $('#guess').val("");
    pastGuesses = [];
};

//evaluate
var checkGuess = function () {
    var guess = $('#guess').val();
    
    //build guess array
    pastGuesses.push(" " + guess + " ");

    //dont check the distance between guesses on the first guess
    if (pastGuesses.length > 1) { hotterOrColder(guess); };
    
    $('#allGuesses').html(pastGuesses.toString());

    //get the distance between winning number and guess
    variance = Math.abs(guess - winningNumber);
    if (variance > 15) {
        console.log("cold");
        $('#feedBack').html("You're cold, so very cold");
    }

    else if (variance > 5 && variance < 15) {
        console.log("warm");
        $('#feedBack').html("Gettin' warm!");
    }

    else if (variance <= 5 && variance > 0) {
        console.log("hot");
        $('#feedBack').html("You're getting so close! SPICY HOT");
    }

    else if (variance == 0) {
        console.log("winner");
        $('#feedBack').html("Winner Winner!");
        $('#hotter').html("Congratulations, you've won! It took you " + pastGuesses.length + " guesses");
    }
    else {
        console.log("cold");
        $('#feedBack').html("You're cold, so very cold");
    };

    lastGuess = guess;
};

var hotterOrColder = function (guess) {
    console.log(guess);
    var guessVariance = getVariance(guess, winningNumber);   
    var lastGuessVariance = getVariance(lastGuess, winningNumber);

    console.log(lastGuessVariance + " this is the last guess variance");
    console.log(guessVariance + " this is the guess variance");
    
    $('#hotter').html("");
    $('#colder').html("");

    if (guessVariance < lastGuessVariance) {
        $('#hotter').html("You are GETTIN HOTTER than your last guess");
    }

    else {
        $('#colder').html("You are GETTIN COLDER than your last guess");
    };

};

var getVariance = function (guess, winningNumber) {
    if (guess > winningNumber)
        return guess-winningNumber
    else
        return winningNumber-guess
};


