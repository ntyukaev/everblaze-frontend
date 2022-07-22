import { FC, ReactElement } from 'react'
import { RightSidebarType } from '../RightSidebar/RightSidebar'
import styles from './Playground.module.scss'

type SidebarsType = {
  children: ReactElement<RightSidebarType> | ReactElement<RightSidebarType>[]
}

const Sidebars: FC<SidebarsType> = ({ children }) => {
  return (
    <div className={styles.PlaygroundSidebars}>{ children }</div>
  )
}

type CanvasType = {
  children: ReactElement | ReactElement[]
}

const Canvas: FC<CanvasType> = ({ children }) => {
  return (
    <div className={styles.PlaygroundCanvas}>{ children }</div>
  )
}
type BodyType = {
  children: ReactElement | ReactElement[]
}

const Body: FC<BodyType> = ({ children }) => {
  return (
    <div className={styles.PlaygroundBody}>{ children }</div>
  )
}

type PlaygroundType = {
  children: ReactElement<BodyType>
}

type PlaygroundElements = {
  Body: FC<BodyType>,
  Canvas: FC<CanvasType>,
  Sidebars: FC<SidebarsType>
}

const Playground: FC<PlaygroundType> & PlaygroundElements = ({ children }: PlaygroundType) => {
  return (
    <div className={styles.Playground}>
        { children }
    </div>
  )
}

Playground.Body = Body
Playground.Canvas = Canvas
Playground.Sidebars = Sidebars

export default Playground
