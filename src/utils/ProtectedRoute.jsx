import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
