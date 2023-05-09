import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import VerificationModal from "../components/VerificationModal";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (isSignedIn && userLoaded) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      await signUp.create({
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      });

      await signUp.prepareEmailAddressVerification();
      setShow(true);
    } catch (err) {
      console.error("Error: ", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  };

  const handleVerification = async () => {
    try {
      await signUp
        .attemptEmailAddressVerification({ code: verificationCode })
        .then((result) => {
          if (result.status === "complete") {
            setActive({ session: result.createdSessionId });
            navigate("/");
          }
        });
    } catch (err) {
      console.error("Error: ", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  };

  const validateForm = () => {
    if (!firstName || !lastName || !username || !email || !password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  if (!isLoaded) return null;

  return (
    <Container className="signup-container">
      <Container>
        <h3>Create your Account</h3>
        <h6>to continue to the application</h6>
        <Container className="form-container">
          <Form className="form-card" onSubmit={handleSubmit}>
            <Row md={2}>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
            <Form.Text>
              Already have an account? <Link to="/sign-in">Sign In</Link>
            </Form.Text>
            <br />
            <Form.Text className="error-message">{error}</Form.Text>
          </Form>
        </Container>
      </Container>
      <VerificationModal
        show={show}
        handleClose={handleClose}
        handleVerification={handleVerification}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
      />
    </Container>
  );
};

export default SignUp;
