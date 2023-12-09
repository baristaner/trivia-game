import 'bootstrap/dist/css/bootstrap.min.css';
// src/TriviaGame.js
import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Modal } from 'react-bootstrap';
import './TriviaGame.css'

// Assuming you have the questions in a separate file
import questionsData from './questions.json';

const TriviaGame = () => {
  const [score, setScore] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [passesRemaining, setPassesRemaining] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);


  useEffect(() => {
    // Load score from localStorage on component mount
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }

    // Set the first question
    setCurrentQuestion(questionsData[currentQuestionIndex]);
    setIsAnswerCorrect(null); // Reset the answer correctness state
  }, [currentQuestionIndex]);

  const saveScore = (newScore) => {
    // Save score to localStorage
    localStorage.setItem('score', newScore.toString());
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
    }

    setScore(newScore);
    saveScore(newScore);

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
        index === correctAnswerIndex || index === randomIncorrectIndex ? option : 'Hidden'
      );

      // Update the current question with hints applied
      setCurrentQuestion(updatedQuestion);
    }
  };

  const handlePass = () => {
    if (passesRemaining > 0) {
      // Decrement passesRemaining
      setPassesRemaining(passesRemaining - 1);

      // Move to the next question or end the game
      if (currentQuestionIndex + 1 < questionsData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Game over logic (e.g., display a message, reset game, etc.)
        alert('Game Over! Your final score is: ' + score);
        // Reset the game if needed
        resetGame();
      }
    }
  };

  const resetGame = () => {
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

    setScore(0);
    setHintsRemaining(3);
    setPassesRemaining(3);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(shuffledQuestions[0]);
    setShowGameOverModal(false);
  };
  

  const handleCloseModal = () => {
    // Close the game over modal or perform any other necessary actions
    setShowGameOverModal(false);
  };

  return (
    <Container className="trivia-container">
      <h1 className="game-title">Trivia Game</h1>
      <Card className="game-card">
        <Card.Body>
          <Card.Title className="score-title">Score: {score}</Card.Title>
          <Card.Text className="hints-passes">
            Hints Remaining: {hintsRemaining} | Passes Remaining: {passesRemaining}
          </Card.Text>
          {currentQuestion && (
            <>
              <Card.Title className="question-title">{currentQuestion.question}</Card.Title>
              <div className="options-container">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={option === 'Hidden'}
                    className="option-button"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {isAnswerCorrect !== null && (
                <p className={`answer-status ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
                  {isAnswerCorrect
                    ? 'Correct! You can proceed to the next question.'
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

      {/* Game Over Modal */}
      <Modal show={showGameOverModal} onHide={handleCloseModal} className="game-over-modal">
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your final score is: {score}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={resetGame}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TriviaGame;
