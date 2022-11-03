import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, Text } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import singleMovieLoader from "./api/loaders/movies";
import { MainLayout } from "./components/layouts/MainLayout";
import AuthContextProvider from "./context/AuthContext";
import "./index.css";
import Login from "./pages/accounts/Login";
import SignUp from "./pages/accounts/SignUp";
import { ErrorPage } from "./pages/Error";
import Home from "./pages/Home";
import { MoviePage } from "./pages/Movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:id",
        loader: singleMovieLoader,
        element: <MoviePage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterProvider router={router} />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
