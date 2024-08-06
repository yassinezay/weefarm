import React from "react";

// Auth Imports
import SignIn from "views/auth/SignIn";
import ForgotPassword from "views/auth/ForgotPassword";
import ResetPassword from "views/auth/ResetPassword";

const authRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    component: <ForgotPassword />,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset-password/:token",
    component: <ResetPassword />,
  }
];

export default authRoutes;
