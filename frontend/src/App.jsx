import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from 'layouts/admin';
import AuthLayout from 'layouts/auth';
import ProductLayout from 'layouts/product'; // Add Product Layout
import superadminRoutes from 'router/superadminRoutes';
import userRoutes from 'router/userRoutes';
import productRoutes from 'router/Productroutes'; // Import product routes

const App = () => {
  const [routes, setRoutes] = useState({ admin: [], auth: [], product: [] });
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  useEffect(() => {
    const availableRoutes = userRole === 'superadmin' ? superadminRoutes : userRoutes;
    setRoutes({
      admin: availableRoutes.filter(route => route.layout === '/admin'),
      auth: availableRoutes.filter(route => route.layout === '/auth'),
      product: productRoutes.filter(route => route.layout === '/product')
    });
  }, [userRole]);

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="admin/*" element={<AdminLayout />}>
        {routes.admin.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
          />
        ))}
      </Route>

      {/* Auth Routes */}
      <Route path="auth/*" element={<AuthLayout />}>
        {routes.auth.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
          />
        ))}
      </Route>

      {/* Product Routes */}
      <Route path="product/*" element={<ProductLayout />}>
        {routes.product.map((route, index) => (
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
