window.game = (function() {
  const MAX_NUM = 10000;
  let answer;
  let attempt;
  let fragment;

  // Instance stores a reference to the Singleton
  let instance;

  /**
   * Singleton Init the game
   */
  function init() {
    fragment = $('#game').innerHTML;
    start();
  }

  function start() {
    answer = $('#answer');
    attempt = $('#attempt');
    $('#guess').addEventListener('click', guess);
    $('#reload').addEventListener('click', reset);
  }

  /**
   * guess The main method of the game
   */
  function guess() {
    let input = $('#user-guess');

    //Only set the answer and attempt hidden inputs when they aren't already set
    if (answer.value === '' || attempt.value === '') {
      setHiddenFields();
  }

    //validateStringLength if the length of the input is not 4
    if (!validateStringLength(input.value, 4)) {
      // use the `setMessage` function to set the `message` label to `"Guesses must be exactly 4 characters long."`,
      setMessage($('#message'), 'Guesses must be exactly 4 characters long.');
      return;
    }

    // increment the number of attempts
    attempt.value++;

    if (getResults(input.value)) {     //if the user has guessed correctly
      setMessage($('#message'), 'You Win! :)');
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) { //if the user has exceed the number of attempts
      setMessage($('#message'), 'You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      setMessage($('#message'), 'Incorrect, try again.'); //otherwise keep playing
    }
  }

  /**
   * setHiddenFields Set the answer variable equal to a randomly generated whole number between 0 and 9999
   */
  function setHiddenFields() {
    // Set the hidden input attempt's value to zero
    attempt.value = 0;

    // Sets the answer variable equal to a randomly generated whole number between 0 and 9999
    answer.value = getRandomInt(MAX_NUM).toString();

    // Make sure the hidden input answer's value is exactly 4 characters long
    while (answer.value.length < 4) {
      answer.value = `0${answer.value}`;
    }
  }

  /**
   * getResults Add the results of the user's guess to our `results` div's `innerHTML`
   * @param input The value the user guessed
   * @returns {boolean} If all characters were guessed correctly, the function return `true`, otherwise `false`
   */
  function getResults(input) {
    //create html to insert into #results
    let html = `<div class="row"><span class="col-md-6">${input}</span><div class="col-md-6">`;

    //for each character
    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i) === answer.value.charAt(i)) {

        //if the character is in the correct position in the `answer`
        html += '<span class="glyphicon glyphicon-ok"></span>'; //add icon ok
      } else if (answer.value.indexOf(input.charAt(i)) > -1) {

        //if the character is in the `answer` but isn't in the right position
        html += '<span class="glyphicon glyphicon-transfer"></span>'; //add icon transfer
      } else {

        //if the number isn't in the `answer` at all
        html += '<span class="glyphicon glyphicon-remove"></span>'; //add icon remove
      }
    }

    //close html tags
    html += '</div></div>';

    //append the html to the #return element
    $('#results').innerHTML += html;

    return input === answer.value;
  }

  /**
   * showAnswer Display the Answer and updates the UI according to the parameter value
   * @param success true if the player has won, false otherwise
   */
  function showAnswer(success) {
    let code;
    code = $('#code');

    if (success) {
      code.className += ' success';
    } else {
      code.className += ' failure';
    }

    code.innerHTML = answer.value;
  }

  /**
   * showReplay Change the UI so the user can start over after they win or lose the game
   */
  function showReplay() {
    toggleClass($('#guessing-div'), "hidden");
    toggleClass($('#replay-div'), "hidden");
  }

  /**
   * reload Reloads the page
   */
  function reset() {
    attempt.value = '';
    answer.value = '';
    $('#game').innerHTML = fragment;
    start();
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    start: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }
  };
})();
