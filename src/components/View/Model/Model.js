import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../../Layout'
import ModelArea from './ModelArea'

const Model = () => {
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

export default Model
