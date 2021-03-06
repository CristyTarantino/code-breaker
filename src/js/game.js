window.game = (function game() {
  var MAX_NUM = 10000;

  var fragment;

  var reset;
  var guess;

  var message;
  var results;
  var answer;
  var attempt;
  var code;
  var guessingDiv;
  var replayDiv;
  var userGuess;


  // Instance stores a reference to the Singvaron
  var singleInstance;

  /**
   * setHiddenFields Set the answer variable equal
   *                 to a randomly generated whole number between 0 and 9999
   * @return { void }
   */
  function setHiddenFields() {
    // Set the hidden input attempt's value to zero
    attempt.value = 0;

    // Sets the answer variable equal
    // to a randomly generated whole number between 0 and 9999
    answer.value = getRandomInt(MAX_NUM).toString();

    // Make sure the hidden input answer's value is exactly 4 characters long
    while (answer.value.length < 4) {
      answer.value = '0' + answer.value;
    }
  }

  /**
   * getResults Add the results of the user's guess
   *            to our `results` div's `innerHTML`
   * @param { string } input The value the user guessed
   * @return { boolean } If all characters were guessed correctly,
   *                     the function return `true`, otherwise `false`
   */
  function getResults(input) {
    // create html to insert into #results
    var html = '<div class="row"><span class="col-md-6">' +
                input +
               '</span><div class="col-md-6">';

    // for each character
    for (var i = 0; i < input.length; i++) {
      if (input.charAt(i) === answer.value.charAt(i)) {
        // if the character is in the correct position in the `answer`
        html += '<span class="glyphicon glyphicon-ok"></span>'; // add icon ok
      } else if (answer.value.indexOf(input.charAt(i)) > -1) {
        // if the character is in the `answer` but isn't in the right position
        // add icon transfer
        html += '<span class="glyphicon glyphicon-transfer"></span>';
      } else {
        // if the number isn't in the `answer` at all
        // add icon remove
        html += '<span class="glyphicon glyphicon-remove"></span>';
      }
    }

    // close html tags
    html += '</div></div>';

    // append the html to the #return element
    results.innerHTML += html;

    return input === answer.value;
  }

  /**
   * showAnswer Display the Answer and updates the UI accordingly
   * @param { boolean } success true if the player has won, false otherwise
   * @return { void }
   */
  function showAnswer(success) {
    if (success) {
      toggleClass(code, 'success');
    } else {
      toggleClass(code, 'failure');
    }

    code.innerHTML = answer.value;
  }

  /**
   * showReplay Change the UI so the user can start over
   * after they win or lose the game
   * @return { void }
   */
  function showReplay() {
    toggleClass(guessingDiv, 'hidden');
    toggleClass(replayDiv, 'hidden');
  }

  /**
   * guess The main method of the game
   * @return { void }
   */
  guess = function play() {
    // Only set the answer and attempt hidden inputs
    // when they aren't already set
    if (answer.value === '' || attempt.value === '') {
      setHiddenFields();
    }

    // validateStringLength if the length of the input is not 4
    if (!validateStringLength(userGuess.value, 4)) {
      // use the `setMessage` function to set the `message` label
      // to `"Guesses must be exactly 4 characters long."`,
      setMessage(message, 'Guesses must be exactly 4 characters long.');
      return;
    }

    // increment the number of attempts
    attempt.value++;

    // if the user has guessed correctly
    if (getResults(userGuess.value)) {
      setMessage(message, 'You Win! :)');
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) {
      // if the user has exceed the number of attempts
      setMessage(message, 'You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      // otherwise keep playing
      setMessage(message, 'Incorrect, try again.');
    }
  };

  /**
   * Set up the game
   * @return { void }
   */
  function setup() {
    answer = $('#answer');
    attempt = $('#attempt');
    message = $('#message');
    results = $('#results');
    code = $('#code');
    guessingDiv = $('#guessing-div');
    replayDiv = $('#replay-div');
    userGuess = $('#user-guess');
    $('#guess').addEventListener('click', guess);
    $('#reload').addEventListener('click', reset);
  }

  /**
   * Reload the page
   * @return { void }
   */
  reset = function resetGame() {
    attempt.value = '';
    answer.value = '';
    $('#game').innerHTML = fragment;
    setup();
  };

  /**
   * Singvaron Init the game
   * @return { void }
   */
  function init() {
    fragment = $('#game').innerHTML;
    setup();
  }

  return {
    /*
     * Get the Singleton instance if one exists or create one if it doesn't
     * @return { object } game instance
     */
    start: function start() {
      if ( !singleInstance ) {
        singleInstance = init();
      }

      return singleInstance;
    }
  };
})();
