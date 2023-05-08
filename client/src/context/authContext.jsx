import { createContext, useEffect, useState } from 'react'
import axios from '../api/axios'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async (inputs) => {
    const res = await axios.post('/api/auth/login', inputs)
    setCurrentUser(res.data)
  }

  const logout = async () => {
    const res = await axios.get('/api/auth/logout')
    setCurrentUser(null)
  }

  const updateUser = (userObject) => {
    setCurrentUser({ user: userObject })
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
