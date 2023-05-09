import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Container, Button } from "react-bootstrap";

export const Home = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded || !isSignedIn) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  return (
    <Container className="mt-5">
      <h1>
        Hello! {user.firstName} {user.lastName}
      </h1>
      <hr />
      <p>Username: {user.username}</p>
      <p>Email Address: {user.emailAddresses[0].emailAddress}</p>
      <Button variant="secondary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Container>
  );
};
