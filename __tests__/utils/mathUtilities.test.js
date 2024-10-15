const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("should properly give answers in correct format", () => {
    const result = getQuestion();
    expect(typeof result.question).toBe("string");
    expect(typeof result.correctAnswer).toBe("number");
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("should return true for the correct answer", () => {
    const exampleQuestion = {
      question: "5+4",
      correctAnswer: 9,
    };
    const userAnswer = "9";
    const result = isCorrectAnswer(exampleQuestion, userAnswer);
    expect(result).toBe(true);
  });

  test("should return a false for an incorrect answwr", () => {
    const exampleQuestion = {
      question: "5+4",
      correctAnswer: 9,
    };
    const userAnswer = "7";
    const result = isCorrectAnswer(exampleQuestion, userAnswer);
    expect(result).toBe(false);
  });
});
