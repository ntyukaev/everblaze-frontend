import { FC } from 'react'
import styled from 'styled-components'
import { Identity } from '../../ts/types'
import { Scalable, SelectableChart, SelectableSheet } from '../../ts/interfaces'
import ChartList from '../ChartList'
import styles from './Sheet.module.scss'

interface IScalableSheetContainer extends Scalable {}

const ScalableSheetContainer = styled.div<IScalableSheetContainer>`
  transform: scale(${(props) => props.scale});
  overflow: hidden;
`

interface SheetImpl extends SelectableSheet, SelectableChart, Scalable {
  reportId: Identity
}

const Sheet: FC<SheetImpl> = ({ selectedSheet, selectedChart, scale, reportId }) => {
  return (
    <div className={styles.Sheet}>
      <ScalableSheetContainer scale={scale} className={styles.ScalableSheetContainer}>
        <ChartList reportId={reportId} scale={scale} selectedSheet={selectedSheet} selectedChart={selectedChart} />
      </ScalableSheetContainer>
    </div>
  )
}

export default Sheet
