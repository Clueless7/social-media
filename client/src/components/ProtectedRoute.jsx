import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const ProtectedRoute = (props) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return props.children
}

export default ProtectedRoute
