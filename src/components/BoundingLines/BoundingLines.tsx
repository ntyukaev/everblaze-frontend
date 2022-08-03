/* eslint-disable */
import { FC } from 'react'
import styles from './BoundingLines.module.scss'

interface IBoundingLines {
  width: number,
  height: number,
  lines: number[][][]
}

const BoundingLines: FC<IBoundingLines> = ({ height, width, lines }) => {
  return (
    <svg className={styles.BoundingLines} xmlns="http://www.w3.org/2000/svg" height={height} width={width}>
      {lines.map((line, index) => {
        return (
          <line className={styles.BoundLine} key={index} x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]} />
        )
      })}
    </svg>
  )
}

export default BoundingLines
