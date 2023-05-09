import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSignedIn && userLoaded) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    await signIn
      .create({
        identifier: identifier,
        password: password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          navigate("/");
        } else {
          console.log("Error: ", result);
        }
      })
      .catch((err) => {
        console.error("Error: ", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  };

  const validateForm = () => {
    if (!identifier || !password) {
      return false;
    }
    return true;
  };

  if (!isLoaded) return null;

  return (
    <Container className="signin-container">
      <Container>
        <h3>Sign In</h3>
        <h6>to continue to the application</h6>
        <Container className="form-container">
          <Form className="form-card" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username/Email address</Form.Label>
              <Form.Control
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </Form.Text>
            <br />
            <Form.Text className="error-message">{error}</Form.Text>
          </Form>
        </Container>
      </Container>
    </Container>
  );
};

export default SignIn;
