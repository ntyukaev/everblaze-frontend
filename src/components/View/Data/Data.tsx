import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../../Layout'

const Data = () => {
  return (
    <>
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo/>
      <Playground>
        <Playground.Body>
          <Playground.Canvas>
            <div>Canvas</div>
          </Playground.Canvas>
          <Playground.Sidebars>
            <RightSidebar title="Fields">
              <div>Right Sidebar</div>
            </RightSidebar>
          </Playground.Sidebars>
        </Playground.Body>
      </Playground>
    </>
  )
}

export default Data
