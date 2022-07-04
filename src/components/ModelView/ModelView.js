import BottomInfo from '../BottomInfo'
import Playground from '../Playground/Playground'
import TopMenu from '../TopMenu'
import ViewToolbar from '../ViewToolbar'
import RightSidebar from '../RightSidebar'
import ModelArea from '../ModelArea'

const ModelView = () => {
  const sidebar = [<RightSidebar key="Properties" title="Properties"/>,
                   <RightSidebar key="Fields" title="Fields"/>]
  return (
    <>
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo/>
      <Playground sidebar={sidebar}>
        <ModelArea/>
      </Playground>
    </>
  )
}

export default ModelView
