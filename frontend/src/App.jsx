import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import adminRoutes from "router/routes";
import authRoutes from "router/Authroutes";


const App = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="admin/*" element={<AdminLayout />}>
        {adminRoutes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
          />
        ))}
      </Route>

      {/* Auth Routes */}
      <Route path="auth/*" element={<AuthLayout />}>
        {authRoutes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
          />
        ))}
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default App;
