import { useDispatch } from 'react-redux'
import { increment, decrement } from '../../reducers/sheetScale'
import WMWWrapper from '../WMWWrapper'
import ReportView from '../ReportView'
import 'antd/dist/antd.min.css'
import './App.scss'

function App () {
  const dispatch = useDispatch()
  const handleWindowMouseWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
      if (e.deltaY > 0) {
        dispatch(decrement())
      } else {
        dispatch(increment())
      }
    }
  }
  return (
    <WMWWrapper onWindowMouseWheel={handleWindowMouseWheel}>
      <div className="App">
        <ReportView/>
      </div>
    </WMWWrapper>
  )
}

export default App
