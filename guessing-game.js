// readLine module
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// global variables
let secretNumber;
let numAttempts;

// function to generate random number within range
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min + 1;
}

// ask for guess number
const askGuess = () => {
  numAttempts--;
  rl.question('Enter a guess: ', guess => {
    if (checkGuess(Number(guess))) {
      console.log('You win!');
      rl.close();
    } else if (numAttempts === 0) {
      console.log(`You Lose. The number was ${secretNumber}`);
      rl.close();
    } else {
      console.log(`You have ${numAttempts} attempts remaining.`);
      askGuess();
    }
  });
};

// check the user input number
const checkGuess = number => {
  if (number < secretNumber) {
    console.log('Too low.');
    return false;
  } else if (number > secretNumber) {
    console.log('Too high.');
    return false;
  } else {
    console.log('Correct!');
    return true;
  }
};

// ask for range of number
const askRange = () => {
  rl.question('Enter a max number: ', max => {
    rl.question('Enter a min number: ', min => {
      console.log(`I'm thinking of a number between ${min} and ${max}...`);
      secretNumber = randomInRange(+min, +max);
      // numAttempts = 5;
      askGuess();
    });
  });
};

// ask for number of attempts
const askLimit = () => {
  rl.question('Enter the number of attempts: ', limit => {
    numAttempts = +limit;
    askRange();
  });
};

// begin the game by calling askLimit
askLimit();
