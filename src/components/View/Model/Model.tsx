import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../../Layout'

const Model = () => {
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
            <RightSidebar key="Properties" title="Properties">
              <div>Properties</div>
            </RightSidebar>
            <RightSidebar key="Fields" title="Fields">
              <div>Fields</div>
            </RightSidebar>
          </Playground.Sidebars>
        </Playground.Body>
      </Playground>
    </>
  )
}

export default Model
