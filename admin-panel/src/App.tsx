import { useState, useEffect } from 'react'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel'
import './App.css'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <AdminPanel />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      </div>
  )
}
