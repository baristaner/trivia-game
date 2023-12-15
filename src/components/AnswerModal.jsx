import React from "react";
import { Modal, Button } from "react-bootstrap";

const AnswerModal = ({ correctAnswer, onNextQuestion, showModal, onHide }) => {
  return (
    <div className="answer-modal">

    <Modal show={showModal} onHide={onHide} centered className="game-over-modal">
      <Modal.Header closeButton
      style={{
        backgroundColor: "#160F30",
        color: "#EAE7AF",
        borderRadius: "0px",
      }}
      >
        <Modal.Title>Answer Explanation</Modal.Title>
      </Modal.Header>
      <Modal.Body 
      style={{
        backgroundColor: "#241663",
        color: "#EAE7AF",
        borderRadius: "0px",
      }}
      >
        <p>
          Cevabın yanlış! The correct answer is: {correctAnswer}. Here's an
          explanation.
        </p>
      </Modal.Body>
      <Modal.Footer  style={{ backgroundColor: "#160F30", borderRadius: "0px" }}>
        <Button variant="primary" onClick={onNextQuestion}>
          Next Question
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default AnswerModal;
