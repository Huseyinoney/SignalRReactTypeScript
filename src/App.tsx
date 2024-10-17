import { Route, Routes } from 'react-router-dom'
import './App.css'
import { FC } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const App: FC = () => {

  return (
    <Routes>
      <Route path='/Home' element={<Home />} />
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
    </Routes>
  )
}
export default App