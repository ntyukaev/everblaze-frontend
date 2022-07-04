import TopMenu from '../TopMenu'
import ViewToolbar from '../ViewToolbar'
import BottomInfo from '../BottomInfo'
import Playground from '../Playground/Playground'
import ScaleSlider from '../ScaleSlider/ScaleSlider'
import ReportArea from '../ReportArea'
import TabList from '../TabList'
import RightSidebar from '../RightSidebar'

const ReportView = () => {
  const sidebar = [<RightSidebar key='Visualizations' title="Visualizations"/>,
                   <RightSidebar key="Fields" title="Fields"/>]
  return (
    <>
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo>
        <ScaleSlider/>
      </BottomInfo>
      <Playground sidebar={sidebar}>
        <ReportArea/>
        <TabList/>
      </Playground>
    </>
  )
}

export default ReportView
