import { FC } from 'react'
import styled from 'styled-components'
import ChartList from '../ChartList'
import styles from './Sheet.module.scss'

interface IScalableSheetContainer {
  scale?: number
}

const ScalableSheetContainer = styled.div<IScalableSheetContainer>`
  transform: scale(${(props) => props.scale})
`

interface ISheet {
  selectedSheet: number,
  scale: number
}

const Sheet: FC<ISheet> = ({ selectedSheet, scale }) => {
  return (
    <div className={styles.Sheet}>
      <ScalableSheetContainer scale={scale} className={styles.ScalableSheetContainer}>
        <ChartList scale={scale} selectedSheet={selectedSheet} />
      </ScalableSheetContainer>
    </div>
  )
}

export default Sheet
