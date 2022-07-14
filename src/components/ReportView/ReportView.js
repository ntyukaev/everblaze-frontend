import TopMenu from '../TopMenu'
import ViewToolbar from '../ViewToolbar'
import { useDispatch } from 'react-redux'
import { increment, decrement } from '../../reducers/sheetScale'
import BottomInfo from '../BottomInfo'
import Playground from '../Playground/Playground'
import ScaleSlider from '../ScaleSlider/ScaleSlider'
import ReportArea from '../ReportArea'
import TabList from '../TabList'
import RightSidebar from '../RightSidebar'
import WMWWrapper from '../WMWWrapper'
import SheetList from '../SheetList'

const ReportView = () => {
  const sidebar = [<RightSidebar key='Visualizations' title="Visualizations"/>,
                   <RightSidebar key="Fields" title="Fields"/>]

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
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo>
        <ScaleSlider/>
      </BottomInfo>
      <Playground sidebar={sidebar}>
        <ReportArea/>
        <TabList>
          <SheetList/>
        </TabList>
      </Playground>
    </WMWWrapper>
  )
}

export default ReportView
