import { Navigate, useOutletContext } from "react-router-dom";

import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const { user } = useOutletContext();

  if (!user) {
    toast.error("Please login first", {
      toastId: "login-error",
    });

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
