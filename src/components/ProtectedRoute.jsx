import { Navigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const { user, loading } = useOutletContext();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    toast.error("Please login first", {
      toastId: "login-error",
    });

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;