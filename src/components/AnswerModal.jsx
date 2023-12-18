import React from "react";
import { Modal, Button } from "react-bootstrap";

const AnswerModal = ({ correctAnswer, onNextQuestion, showModal, onHide }) => {
  return (
    <div className="answer-modal">
      <Modal show={showModal} onHide={onHide} centered className="">
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#160F30",
            color: "#EAE7AF",
            borderRadius: "0px",
          }}
        >
          <Modal.Title>Yanlış Cevap</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#241663",
            color: "#EAE7AF",
            borderRadius: "0px",
          }}
        >
          <p>Cevabın yanlış! Doğru Cevap: {correctAnswer}.</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#160F30", borderRadius: "0px" }}>
          <Button variant="primary" onClick={onNextQuestion}>
            Diğer Soruya Geç
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default AnswerModal;
