import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import AuthContextProvider from "./context/AuthContext";
import { CustomMantineProvider } from "./context/Mantine";
import "./index.css";
import Login from "./pages/accounts/Login";
import SignUp from "./pages/accounts/SignUp";
import { ErrorPage } from "./pages/Error";
import Home from "./pages/Home";
import { MoviePage } from "./pages/Movie";
import { MovieRequestPage } from "./pages/MovieRequestPage";
import { MovieRatingsPage } from "./pages/movies/MovieRatingsPage";
import { MovieReviewPage } from "./pages/movies/MovieReviews";
import { EditProfilePage } from "./pages/profile/EditProfile";
import Account from "./pages/profile/MainProfile";
import { ProfileListsPage } from "./pages/profile/ProfileListsPage";
import { ProfileRatingsPage } from "./pages/profile/ProfileRatingsPage";
import { ProfileReviewsPage } from "./pages/profile/ProfileReviewsPage";
import { ProfileSearchPage } from "./pages/profile/ProfileSearchPage";

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
        path: "/profiles",
        element: <ProfileSearchPage />,
      },
      {
        path: "/profile/:id",
        element: <Account />,
      },
      {
        path: "/profile/:id/reviews",
        element: <ProfileReviewsPage />,
      },
      {
        path: "/profile/:id/ratings",
        element: <ProfileRatingsPage />,
      },
      {
        path: "/profile/:id/lists",
        element: <ProfileListsPage />,
      },
      {
        path: "/profile/edit",
        element: <EditProfilePage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
      {
        path: "/movie/:id/reviews",
        element: <MovieReviewPage />,
      },
      {
        path: "/movie/:id/ratings",
        element: <MovieRatingsPage />,
      },
      {
        path: "/movierequests",
        element: <MovieRequestPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CustomMantineProvider>
          <ModalsProvider>
            <NotificationsProvider>
              <RouterProvider router={router} />
            </NotificationsProvider>
          </ModalsProvider>
        </CustomMantineProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
