import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Button, Card, Modal,ProgressBar } from "react-bootstrap";
import "./TriviaGame.css";
import AnswerModal from "./components/AnswerModal";
import GameOverModal from "./components/GameOverModal";

// Assuming you have the questions in a separate file
import questionsData from "./questions.json";

const TriviaGame = () => {
  const [score, setScore] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [passesRemaining, setPassesRemaining] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timer, setTimer] = useState(15); // Set the initial timer value (in seconds)
  const [timerId, setTimerId] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  useEffect(() => {
    // Load score from localStorage on component mount
    const storedScore = localStorage.getItem("score");
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }

    // Set the first question
    setCurrentQuestion(questionsData[currentQuestionIndex]);
    setIsAnswerCorrect(null); // Reset the answer correctness state
  }, [currentQuestionIndex]);

  useEffect(() => {
    // Set up the timer interval
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // Timer reached zero, handle it (e.g., trigger game over)
          clearInterval(id);
          setShowGameOverModal(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Save the timer interval ID
    setTimerId(id);

    // Clean up the timer interval on component unmount
    return () => clearInterval(id);
  }, []); // Run this effect once on component mount

  const saveScore = (newScore) => {
    // Save score to localStorage
    localStorage.setItem("score", newScore.toString());
  };

  const handleOptionClick = (selectedOption) => {
    let newScore = score;
    const correctAnswer = currentQuestion.correctAnswer;

    if (selectedOption === correctAnswer) {
      // Update score for correct answer (+10 points)
      newScore += 10;
      setIsAnswerCorrect(true);
    } else {
      // Update score for incorrect answer (-5 points)
      newScore = Math.max(newScore - 5, 0); // Ensure the score is not negative
      setIsAnswerCorrect(false);
      setShowAnswerModal(true);
      clearInterval(timerId);
    }

    setScore(newScore);
    saveScore(newScore);
    setTimer(15); // Reset the timer

    // Check if the score is negative, trigger game over immediately
    if (newScore <= 0) {
      setShowGameOverModal(true);
    } else {
      // Move to the next question or show the game over modal
      if (currentQuestionIndex + 1 < questionsData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Game over logic (e.g., display a message, reset game, etc.)
        setShowGameOverModal(true);
      }
    }
  };

  const handleNextQuestion = () => {
    setShowAnswerModal(false); // Close the AnswerModal
  
    // Reset the timer
    setTimer(15);
    
    // Start a new timer interval
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // Timer reached zero, handle it (e.g., trigger game over)
          clearInterval(id);
          setShowGameOverModal(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  
    // Save the new timer interval ID
    setTimerId(id);
  
    // Move to the next question or show the game over modal
    if (currentQuestionIndex + 1 < questionsData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game over logic (e.g., display a message, reset game, etc.)
      setShowGameOverModal(true);
    }
  };

  const handleHint = () => {
    if (hintsRemaining > 0) {
      // Decrement hintsRemaining
      setHintsRemaining(hintsRemaining - 1);

      // Clone the current question to avoid modifying the original data
      const updatedQuestion = { ...currentQuestion };

      // Find the index of the correct answer
      const correctAnswerIndex = updatedQuestion.options.indexOf(
        updatedQuestion.correctAnswer
      );

      // Generate an array of indices representing incorrect options
      const incorrectIndices = updatedQuestion.options
        .map((_, index) => index)
        .filter((index) => index !== correctAnswerIndex);

      // Randomly select one incorrect option to reveal
      const randomIncorrectIndex =
        incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];

      // Update the options to reveal the correct and one incorrect option
      updatedQuestion.options = updatedQuestion.options.map((option, index) =>
        index === correctAnswerIndex || index === randomIncorrectIndex
          ? option
          : "Hidden"
      );

      // Update the current question with hints applied
      setCurrentQuestion(updatedQuestion);
    }
  };

  const handlePass = () => {
    if (passesRemaining > 0) {
      // Decrement passesRemaining
      setPassesRemaining(passesRemaining - 1);
  
      // Stop the timer
      clearInterval(timerId);
  
      // Move to the next question or end the game
      if (currentQuestionIndex + 1 < questionsData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Game over logic (e.g., display a message, reset game, etc.)
        alert("Game Over! Your final score is: " + score);
        // Reset the game if needed
        resetGame();
      }
  
      // Reset the timer
      setTimer(15);
  
      // Start a new timer interval
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            // Timer reached zero, handle it (e.g., trigger game over)
            clearInterval(id);
            setShowGameOverModal(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
  
      // Save the new timer interval ID
      setTimerId(id);
    }
  };

  const resetGame = () => {
    const shuffledQuestions = [...questionsData].sort(
      () => Math.random() - 0.5
    );
    clearInterval(timerId);
    setScore(0);
    setHintsRemaining(3);
    setPassesRemaining(3);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(shuffledQuestions[0]);
    setShowGameOverModal(false);
    localStorage.removeItem("score");

    setTimer(15);
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // Timer reached zero, handle it (e.g., trigger game over)
          clearInterval(id);
          setShowGameOverModal(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Save the new timer interval ID
    setTimerId(id);
  };

  const handleCloseModal = () => {
    setShowGameOverModal(false);
  };

  return (
    <Container className="trivia-container">
      <h1 className="game-title">Trivia Game</h1>
      <Card className="game-card">
        <Card.Body>
          <Card.Title className="score-title">Score: {score}</Card.Title>
          <Card.Text className="hints-passes">
            Hints Remaining: {hintsRemaining} | Passes Remaining:{" "}
            {passesRemaining}
          </Card.Text>
          <div className="progress-container">
      <ProgressBar
        variant="danger"
        now={(timer / 15) * 100} // Adjust the progress based on your timer duration
      />
      <p className="timer-label" style={{color:"white"}}>Time Remaining: {timer}s</p>
    </div>
          {currentQuestion && (
            <>
              <Card.Title className="question-title">
                {currentQuestion.question}
              </Card.Title>
              <div className="options-container">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={option === "Hidden"}
                    className="option-button"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {isAnswerCorrect !== null && (
                <p
                  className={`answer-status ${
                    isAnswerCorrect ? "correct" : "incorrect"
                  }`}
                >
                  {isAnswerCorrect
                    ? "Correct! You can proceed to the next question."
                    : `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`}
                </p>
              )}
              <div className="action-buttons">
                <Button
                  variant="primary"
                  onClick={handleHint}
                  disabled={hintsRemaining === 0}
                  className="hint-pass-button"
                >
                  Hint
                </Button>
                <Button
                  variant="warning"
                  onClick={handlePass}
                  disabled={passesRemaining === 0}
                  className="hint-pass-button"
                >
                  Pass
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      <GameOverModal
      gameScore={score}
      resetButton={resetGame}
      showGameOverModal={showGameOverModal}
      />

      <AnswerModal
        correctAnswer={currentQuestion?.correctAnswer}
        onNextQuestion={handleNextQuestion}
        showModal={showAnswerModal}
        onHide={() => setShowAnswerModal(false)}
      />
    </Container>
  );
};

export default TriviaGame;
