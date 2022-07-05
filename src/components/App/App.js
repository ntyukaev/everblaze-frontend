import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ReportView from '../ReportView'
import DataView from '../DataView'
import ModelView from '../ModelView'
import 'antd/dist/antd.min.css'
import './App.scss'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/report' element={<ReportView/>}/>
        <Route path='/data' element={<DataView/>}/>
        <Route path='/model' element={<ModelView/>}/>
        <Route path='*' element={<Navigate to='/report' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
