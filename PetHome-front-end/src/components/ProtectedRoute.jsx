import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ user, children }) => {
  if (!user || user.isAdmin !== true) {
    return <Navigate to="/sign-in" />
  }

  return children
}

export default ProtectedRoute
