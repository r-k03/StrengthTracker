import React, { useState } from 'react'
import {Route, Routes, Navigate} from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateLog from './pages/CreateLog'

const App = () => {
  const [date, setDate] = useState(null);

  return (
    <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/create" element={<CreateLog />} />
        </Routes>
    </div>
  )
}

export default App