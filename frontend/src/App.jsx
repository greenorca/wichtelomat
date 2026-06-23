import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/auth/LoginPage'
import ActionsListPage from './pages/actions/ActionsListPage'

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <div>Laden...</div>
  return session ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Öffentlich */}
      <Route path="/login" element={<LoginPage />} />

      {/* Geschützt */}
      <Route path="/" element={
        <ProtectedRoute><ActionsListPage /></ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App