import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isValidSession } from "../utils/session";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = isValidSession();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};