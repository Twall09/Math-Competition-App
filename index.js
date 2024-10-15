const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

// data for the streak
let lastStreak = 0;
let currQuestion = null;

// data for leaderboard
let leaderboard = [];

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  res.render("index", { lastStreak });
});

app.get("/quiz", (req, res) => {
  currQuestion = getQuestion(); // global currQuestion

  res.render("quiz", { question: currQuestion.question, streak: lastStreak });
});

//Handles quiz submissions and also the tracking of streaks.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;

  if (isCorrectAnswer(currQuestion, answer)) {
    lastStreak++; // increment streak by 1 if answer is correct.
    console.log(`Answer: Yes, ${answer}`);
  } else {
    if (lastStreak > 0) {
      leaderboard.push({
        streak: lastStreak,
        date: new Date().toLocaleString(),
      });

      leaderboard.sort((a, b) => b.streak - a.streak);
      if (leaderboard.length > 10) {
        leaderboard.pop();
      }
    } // reset the streak if answer is wrong
    lastStreak = 0;
    console.log(`Answer ${answer} is incorrect.`);
    console.log(`Correct answer is: ${currQuestion.correctAnswer}`);
  }

  //answer will contain the value the user entered on the quiz page
  //Logic must be added here to check if the answer is correct, then track the streak and redirect properly

  // redirect to the completion page..
  res.redirect("/completion");
});

// add a route to the completion page
app.get("/completion", (req, res) => {
  res.render("completion", { streak: lastStreak });
});

// add a route for the leaderboards page
app.get("/leaderboards", (req, res) => {
  res.render("leaderboards", { leaderboard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
