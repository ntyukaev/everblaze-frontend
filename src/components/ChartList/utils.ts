import { IChart, Identity, NumericTriplet } from './../../types/index'
import { readChart, updateChart } from '../../operations/store'
export class GridHelper {
  _gridX: number = 1
  _gridY: number = 1
  _gridIncrement: number = 5
  _deltaX: number = 5
  _deltaY: number = 5
  _boundsDeltaX: number = 20
  _boundsDeltaY: number = 20
  _bounds: number[][][] = []
  readonly pivotsX: NumericTriplet[]
  readonly pivotsY: NumericTriplet[]
  readonly selectedChart: Identity
  readonly canvasHeight: number
  readonly canvasWidth: number
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly chartX: NumericTriplet
  readonly chartY: NumericTriplet
  readonly canvasPivotsX: NumericTriplet
  readonly canvasPivotsY: NumericTriplet

  constructor (charts: IChart[], selectedChart: Identity, canvasHeight: number, canvasWidth: number) {
    if (!selectedChart) {
      throw new Error('No chart is selected')
    }
    this.selectedChart = selectedChart
    const chartData = readChart(selectedChart)
    if (!chartData) {
      throw new Error('No data available for the selected chart')
    }
    const { x, y, width, height } = chartData
    this.x = x
    this.y = y
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
    this.width = width * this.canvasWidth
    this.height = height * this.canvasHeight
    this.pivotsX = charts.filter(chart => chart.id !== selectedChart)
      .map(chart => this._getPivots({ coord: chart.x, length: chart.width * this.canvasWidth }))
    this.pivotsY = charts.filter(chart => chart.id !== selectedChart)
      .map(chart => this._getPivots({ coord: chart.y, length: chart.height * this.canvasHeight }))
    this.chartX = this._getPivots({ coord: this.x, length: this.width })
    this.chartY = this._getPivots({ coord: this.y, length: this.height })
    this.canvasPivotsX = this._getPivots({ coord: 0, length: this.canvasWidth })
    this.pivotsX.push(this.canvasPivotsX)
    this.canvasPivotsY = this._getPivots({ coord: 0, length: this.canvasHeight })
    this.pivotsY.push(this.canvasPivotsY)
  }

  _getPivots ({ coord, length }: {coord: number, length: number}): NumericTriplet {
    return [coord, coord + length / 2, coord + length]
  }

  getCanvasVerticalBounds = () => {
    return [
      [
        [this.canvasWidth / 2, 0], [this.canvasWidth / 2, this.canvasHeight]
      ]
    ]
  }

  getCanvasHorizontalBounds = () => {
    return [
      [
        [0, this.canvasHeight / 2], [this.canvasWidth, this.canvasHeight / 2]
      ]
    ]
  }

  get grid (): [number, number] {
    return [this._gridX, this._gridY]
  }

  get bounds (): number[][][] {
    return this._bounds
  }

  get gridX () {
    return this._gridX
  }

  set gridX (value: number) {
    this._gridX = value
  }

  get gridY () {
    return this._gridY
  }

  set gridY (value: number) {
    this._gridY = value
  }

  createBounds (): void {
    this._getBoundsX()
    this._getBoundsY()
  }

  snap (): void {
    const updates: { x?: number, y?: number } = {}
    const newX = this.getNewX()
    const newY = this.getNewY()
    if (newX) {
      updates.x = newX
      this.gridY = this._gridIncrement
    }
    if (newY) {
      updates.y = newY
      this.gridX = this._gridIncrement
    }
    if (Object.keys(updates).length) {
      updateChart(updates, this.selectedChart)
    }
  }

  _calcluteDistanceBetweenPivots (selected: NumericTriplet, others: NumericTriplet[]) {
    const values: number[][] = []
    others.forEach((other, i1) => {
      other.forEach((piv1, i2) => {
        selected.forEach((piv2, j) => {
          values.push([i1, i2, j, Math.abs(piv2 - piv1)])
        })
      })
    })
    return values
  }

  _findClosestPivot (selected: NumericTriplet, others: NumericTriplet[]) {
    const values = this._calcluteDistanceBetweenPivots(selected, others)
    return values.sort((val1, val2) => val1[3] > val2[3] ? 1 : -1)[0]
  }

  _getBoundsX () {
    const values = this._calcluteDistanceBetweenPivots(this.chartX, this.pivotsX)
      .filter(val => val[3] <= this._boundsDeltaX)
    values.forEach((val) => {
      const x = this.pivotsX[val[0]][val[1]]
      const coordsY = [...this.pivotsY[val[0]], ...this.chartY].sort((a, b) => a - b)
      this._bounds.push(
        [[x, coordsY[0]], [x, coordsY[coordsY.length - 1]]]
      )
    })
  }

  _getBoundsY () {
    const values = this._calcluteDistanceBetweenPivots(this.chartY, this.pivotsY)
      .filter(val => val[3] <= this._boundsDeltaY)
    values.forEach((val) => {
      const y = this.pivotsY[val[0]][val[1]]
      const coordsX = [...this.pivotsX[val[0]], ...this.chartX].sort((a, b) => a - b)
      this._bounds.push(
        [[coordsX[0], y], [coordsX[coordsX.length - 1], y]]
      )
    })
  }

  _getCoord (chartCoords: NumericTriplet, pivots: NumericTriplet[], delta: number) {
    const closestPivot = this._findClosestPivot(chartCoords, pivots)
    const [objInd, pivotInd, chartPivot, val] = closestPivot
    if (val <= delta) {
      if (chartPivot === 0) {
        return pivots[objInd][pivotInd]
      }
      return pivots[objInd][pivotInd] - (chartCoords[chartPivot] - chartCoords[0])
    }
    return null
  }

  getNewX () {
    return this._getCoord(this.chartX, this.pivotsX, this._deltaX)
  }

  getNewY () {
    return this._getCoord(this.chartY, this.pivotsY, this._deltaY)
  }
}
