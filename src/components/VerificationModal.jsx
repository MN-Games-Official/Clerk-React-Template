import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const VerificationModal = ({
  show,
  handleClose,
  handleVerification,
  verificationCode,
  setVerificationCode,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!verificationCode) {
      setError("Verification code is required");
      return;
    }
    handleVerification();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email Verification Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>A code was sent to your email for verification</p>
        <hr />
        <Form.Label>Enter code</Form.Label>
        <Form.Control
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="secondary" onClick={handleSubmit}>
          Verify Code
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerificationModal;
