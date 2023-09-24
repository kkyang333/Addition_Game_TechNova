import React, { useState } from "react";
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [currMax, setMax] = useState(10);
  const [attempts, setAttempts] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  var problem = generateProblem(currMax);
  var num1 = problem[0];
  var num2 = problem[1];
  var correctAnswer = problem[2];
  var choices = [];
  var correctSpot = randomNum(0,3);
  // Choose position of correct answer, and the alternate choices
  for (var i = 0; i < 4; i++) {
    if (i === correctSpot) {
      choices[i] = correctAnswer;
    } else {
      if (randomNum(0,1) === 0) { // Equal chance of the choice being lower or higher than the actual answer
        var newNum = randomNum(0, correctAnswer - 1);
        while (choices.includes(newNum)) {
          newNum = randomNum(0, correctAnswer - 1);
        }
        choices[i] = newNum;
      } else {
        var newNum2 = randomNum(correctAnswer + 1, (correctAnswer + 1) + 20);
        while (choices.includes(newNum2)) {
          newNum2 = randomNum(correctAnswer + 1, (correctAnswer + 1) + 20);
        }
        choices[i] = newNum2;
      }
    }
  }
  const choiceClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    // Increases the max for the random numbers generated to increase difficulty
    setMax(currMax + 20); 
    setAttempts(attempts + 1);
    if (attempts === 9) {
      setShowFinal(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setMax(10);
    setAttempts(0);
    setShowFinal(false);
  };

  return (
    <div className="App">
    <h1> ADDITION GAME </h1>
    <h2> <i> Score = {score} </i> </h2>
    {showFinal ? (
        <div className="final-score">
          <h1>Final Score</h1>
          <h2>
            {score} / 10 - (
            {(score / 10) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart</button>
        </div>
      ) : (
    <div className="problem">
      <h3> {num1} + {num2} = ? </h3>
      <ul>
        <li onClick={() => choiceClicked(0 === correctSpot)}> {choices[0]} </li>
        <li onClick={() => choiceClicked(1 === correctSpot)}> {choices[1]} </li>
        <li onClick={() => choiceClicked(2 === correctSpot)}> {choices[2]} </li>
        <li onClick={() => choiceClicked(3 === correctSpot)}> {choices[3]} </li>

      </ul>

    </div>
       )} 
       </div>
  );
}

function generateProblem(max) {
  var num1 =  randomNum(0, max);
  var num2 =  randomNum(0, max);
  var result = num1 + num2;
  return [num1, num2, result];
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default App;
