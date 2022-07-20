import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../../Layout'
import DataArea from './DataArea'

const Data = () => {
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

export default Data
