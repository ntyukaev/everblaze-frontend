export enum CrudEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export enum FieldTypeEnum {
  X = 'X',
  Y = 'Y'
}

export enum CellTypeEnum {
  INT = 'INT',
  FLOAT = 'FLOAT',
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING'
}

export enum DragTypeEnum {
  COLUMN = 'COLUMN'
}

export enum ChartTypeEnum {
  LINE_CHART = 'LINE_CHART',
  BAR_CHART = 'BAR_CHART'
}

export type CellProps = {
  type: keyof typeof CellTypeEnum,
  index: number,
  value: any
}
