import BottomInfo from '../BottomInfo'
import Playground from '../Playground/Playground'
import TopMenu from '../TopMenu'
import ViewToolbar from '../ViewToolbar'
import RightSidebar from '../RightSidebar'
import DataArea from '../DataArea'

const DataView = () => {
  return (
    <>
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo/>
      <Playground sidebar={<RightSidebar title="Fields"/>}>
        <DataArea/>
      </Playground>
    </>
  )
}

export default DataView