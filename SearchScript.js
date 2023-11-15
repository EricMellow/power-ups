var cancelButton = document.querySelector('.cancel-btn');
var saveButton = document.querySelector('.save-btn');
var messageInput = document.querySelector('.search-input');

//Enters range and generates random number
rangeButton.addEventListener('click', function() {
  randomNumber = GenerateRandomNumber();
  document.querySelector('.guess-words').innerText = 'Enter a guess between ' + minNum + ' and ' + maxNum + '.';
  rangeButton.classList.remove('button-enabled');
});

//Button enable for min-max input
maxNum.addEventListener('keyup', function() {
  if (parseInt(minNum.value) < parseInt(maxNum.value)) {
    rangeButton.classList.add('button-enabled');
  } else {
    rangeButton.classList.remove('button-enabled');
  };
});

//Function to generate random number
function GenerateRandomNumber() {
  maxNum = parseInt(maxNum.value);
  minNum = parseInt(minNum.value);
  var number = Math.floor(Math.random() * (maxNum - minNum + 1))  + minNum;
  console.log(number);
  return number;
};

//Main Buttons disable
userGuess.addEventListener('input', function() {
  if (userGuess.value.length) {
    clearButton.classList.add('button-enabled');
    guessButton.classList.add('button-enabled');
    resetButton.classList.add('button-enabled');
  } else {
    clearButton.classList.remove('button-enabled');
    guessButton.classList.remove('button-enabled');
    resetButton.classList.remove('button-enabled');
  };
})

//Guess Button submit and appropriate response
guessButton.addEventListener('click', function () {
  var newGuess = userGuess.value;
// console.log(randomNumber);
newGuess = parseInt(newGuess, 10);
lastGuess.innerText = newGuess;
if (Number.isNaN(newGuess)) { 
  lastGuess.innerText = 'Oops!';
  hint.innerText = 'Please guess a number between ' + minNum + ' and ' + maxNum +'.';
}  else if (newGuess > maxNum) {
  lastGuess.innerText = 'Oops!';
  hint.innerText = 'Please guess a number between ' + minNum + ' and ' + maxNum +'.';
} else if (newGuess < minNum) {
  lastGuess.innerText = 'Oops!';
  hint.innerText = 'Please guess a number between ' + minNum + ' and ' + maxNum +'.';
} else if (newGuess === randomNumber) {
  hint.innerText = 'BOOM!'; 
} else if (randomNumber < newGuess) {
  hint.innerText = 'That is too high'; 
} else {
  hint.innerText = 'That is too low';
}
});

//Clear Button function
clearButton.addEventListener('click', function () {
  userGuess.value = "";
  clearButton.classList.remove('button-enabled');
  guessButton.classList.remove('button-enabled');
});

//Reset Button function
resetButton.addEventListener('click', function() {
  location.reload();
  clearButton.classList.remove('button-enabled');
  guessButton.classList.remove('button-enabled');
  resetButton.classList.remove('button-enabled');
});
