import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function GameOverModal({
  gameScore,
  resetButton,
  showGameOverModal,
}) {
  const handleCloseModal = () => {
    showGameOverModal(false);
  };
  return (
    

    <Modal
      show={showGameOverModal}
      onHide={handleCloseModal}
      className="game-over-modal"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#160F30",
          color: "#EAE7AF",
          borderRadius: "0px",
        }}
      >
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#241663",
          color: "#EAE7AF",
          borderRadius: "0px",
        }}
      >
        <p>Your final score is: {gameScore}</p>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#160F30", borderRadius: "0px" }}>
        <Button variant="primary" onClick={resetButton}>
          Play Again
        </Button>
      </Modal.Footer>
    </Modal>

  );
}
