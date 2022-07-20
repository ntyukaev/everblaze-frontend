import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../../contexts/useAuth'
import ReportView from '../ReportView'
import { Login, Register, Model, Data } from '../View'
import 'antd/dist/antd.min.css'
import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='app/:reportId'>
            <Route path='report' element={<ReportView />} />
            <Route path='data' element={<Data />} />
            <Route path='model' element={<Model />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Navigate to='/choose_report' />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
