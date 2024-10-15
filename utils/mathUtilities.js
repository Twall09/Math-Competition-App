/**
 * Gets a random multiplication, division, subtraction or addition question
 *
 * @returns {} The randomly generated math question
 */
function getQuestion() {
  const operators = ["+", "-", "*", "/"];
  const getOperators = operators[Math.floor(Math.random() * operators.length)];
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1; // Random numbers between 1 and 20

  let question;
  let correctAnswer;

  // defining each case for the specific operator. Question will be random equation with numbers between 1 & 100.
  switch (getOperators) {
    case "+":
      correctAnswer = num1 + num2;
      question = `${num1} + ${num2}`;
      break;
    case "-":
      correctAnswer = num1 - num2;
      question = `${num1} - ${num2}`;
      break;
    case "*":
      correctAnswer = num1 * num2;
      question = `${num1} * ${num2}`;
      break;
    case "/":
      correctAnswer = num1 / num2;
      question = `${num1} / ${num2}`;
      break;
  }

  return {
    question,
    correctAnswer,
  };
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(currQuestion, answer) {
  return parseInt(answer) === parseInt(currQuestion.correctAnswer);
  // essentially compares users answer to the actual correct answer
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
