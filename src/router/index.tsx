import { Navigate, useRoutes } from "react-router-dom";
import { ROUTES } from "./path";
import HomePage from "../pages/home/homePage";
import SignInPage from "../pages/signin/SigninPage";
import SignUpPage from "../pages/signup/SignUpPage";
import ErrorPage from "../pages/error/ErrorPage";
import ProtectRoute from "../components/protectRout/ProtectRoute";

export default function Router() {
  return useRoutes([
    { path: ROUTES.home, element: <ProtectRoute children={<HomePage />} /> },
    { path: ROUTES.signIn, element: <SignInPage /> },
    { path: ROUTES.signUp, element: <SignUpPage /> },
    { path: ROUTES.error, element: <ErrorPage /> },
    { path: "*", element: <Navigate to={ROUTES.error} replace /> },
  ]);
}
