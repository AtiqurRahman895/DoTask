import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import ErrorPage from "./components/ErrorPageComponent/ErrorPage";
import Base from './components/BaseComponent/Base';
import PrivateRoute from "./components/AuthenticationComponent/PrivateRoute";
import Login from './components/AuthenticationComponent/Login';
import AuthProvider from './Provider/AuthProvider';
import Home from "./components/HomeComponent/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },

      // Authentication
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/update-profile",
      //   element: (
      //     <PrivateRoute>
      //       <UpdateProfile />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ToastContainer position="top-center" />
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
