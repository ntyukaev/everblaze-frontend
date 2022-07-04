import BottomInfo from '../BottomInfo'
import Playground from '../Playground/Playground'
import TopMenu from '../TopMenu'
import ViewToolbar from '../ViewToolbar'
import RightSidebar from '../RightSidebar'
import DataArea from '../DataArea'

const DataView = () => {
  const sidebar = [<RightSidebar key="Fields" title="Fields"/>]
  return (
    <>
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo/>
      <Playground sidebar={sidebar}>
        <DataArea/>
      </Playground>
    </>
  )
}

export default DataView
