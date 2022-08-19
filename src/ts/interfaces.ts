import { CellProps, CrudEnum, FieldTypeEnum } from './enums'
import { Identity, NullableIdentity, ReportProps, ChartProps, SheetProps, ColumnProps, DatasetProps, UserInfoProps, FieldProps } from './types'

export interface Identifiable {
  id: Identity
}

export interface NullableIdentifiable {
  id: NullableIdentity
}

export interface SelectableSheet {
  selectedSheet: NullableIdentity;
}

export interface SelectableDataset {
  selectedDataset: NullableIdentity;
}

export interface SelectableChart {
  selectedChart: NullableIdentity;
}

export interface Crudable {
  status: keyof typeof CrudEnum
}

export interface Scalable {
  scale: number
}

export interface LoginInput {
  email: string,
  password: string
}

export interface RegisterInput extends LoginInput {
  name: string,
  password: string,
  password_confirmation: string
}

export interface ReportImpl extends ReportProps, Identifiable, SelectableChart, SelectableSheet {}
export interface ChartImpl extends ChartProps, Identifiable, Crudable {}
export interface SheetImpl extends SheetProps, Identifiable {}
export interface CellImpl extends CellProps, Identifiable {}
export interface LoginInputImpl extends LoginInput, Identifiable {}
export interface RegisterInputImpl extends RegisterInput, Identifiable {}
export interface UserInfoImpl extends UserInfoProps, Identifiable {}
export interface ColumnDropResultImpl extends Identifiable {
  type: keyof typeof FieldTypeEnum
}
export interface ColumnImpl extends ColumnProps, Identifiable {
  cells: CellImpl[]
}
export interface FieldImpl extends Identifiable {
  column: ColumnImpl
  type: keyof typeof FieldTypeEnum
}
export interface DatasetImpl extends DatasetProps, Identifiable {
  columns: ColumnImpl[]
}

export interface ChartsData {
  charts: ChartImpl[]
}

export interface ChartsVars {
  sheetId: NullableIdentity
}

export interface DatasetData {
  datasets: DatasetImpl[]
}

export interface DatasetsVars {
  reportId: NullableIdentity
}

export interface FieldsData {
  fields: FieldImpl[]
}

export interface FieldsVars {
  chartId: NullableIdentity
}

export interface SheetsData {
  sheets: SheetImpl[]
}

export interface SheetsVars {
  reportId: NullableIdentity
}

export interface SheetsAndDatasetsData {
  sheets: SheetImpl[],
  datasets: DatasetImpl[]
}

export interface SheetsAndDatasetsVars {
  reportId: NullableIdentity
}
