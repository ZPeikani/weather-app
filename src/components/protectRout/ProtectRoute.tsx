import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthCountext";

export default function ProtectRoute({ children }: { children: JSX.Element }) {
  const { authentication } = useAuth();
  if (!authentication) {
    return <Navigate to="/sign-up" />;
  }

  return children;
}
