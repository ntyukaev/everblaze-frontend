import { FC } from 'react'
import styled from 'styled-components'
import { Identity, Scalable, SelectableChart, SelectableSheet } from '../../../../types'
import ChartList from '../ChartList'
import styles from './Sheet.module.scss'

interface IScalableSheetContainer extends Scalable {}

const ScalableSheetContainer = styled.div<IScalableSheetContainer>`
  transform: scale(${(props) => props.scale})
`

interface ISheet extends SelectableSheet, SelectableChart, Scalable {
  reportId: Identity
}

const Sheet: FC<ISheet> = ({ selectedSheet, selectedChart, scale, reportId }) => {
  return (
    <div className={styles.Sheet}>
      <ScalableSheetContainer scale={scale} className={styles.ScalableSheetContainer}>
        <ChartList reportId={reportId} scale={scale} selectedSheet={selectedSheet} selectedChart={selectedChart} />
      </ScalableSheetContainer>
    </div>
  )
}

export default Sheet
