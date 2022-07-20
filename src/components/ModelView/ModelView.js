import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../Layout'
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
