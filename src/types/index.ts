export enum ChartTypeEnum {
  LINE_CHART = 'LINE_CHART',
  BAR_CHART = 'BAR_CHART'
}

export enum FieldTypeEnum {
  X = 'X',
  Y = 'Y'
}

export enum CrudEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export interface Crudable {
  status: keyof typeof CrudEnum
}

export type Identity = number | string
export type NullableIdentity = Identity | null

export interface Identifiable {
  id: Identity
}

export interface NullableIdentifiable {
  id: NullableIdentity
}

export type ReportProps = {
  name: string
}

export type SelectableSheet = {
  selectedSheet: number | null;
}

export type SelectableChart = {
  selectedChart: number | null;
}

export interface IReport extends ReportProps, Identifiable, SelectableChart, SelectableSheet {}

export type ChartProps = {
  type: keyof typeof ChartTypeEnum,
  x: number,
  y: number
}

export interface IChart extends ChartProps, Identifiable, Crudable {}

export type SheetProps = {
  index: number,
  name: string
}

export interface ISheet extends SheetProps, Identifiable {}

export enum CellTypeEnum {
  INT,
  FLOAT,
  BOOLEAN,
  STRING
}

export type CellProps = {
  type: keyof typeof CellTypeEnum,
  value: any
}

export interface ICell extends CellProps, Identifiable {}

export interface ColumnProps {
  name: string,
  index: number,
  type: keyof typeof CellTypeEnum,
  cells: CellProps[]
}

export interface IColumn extends ColumnProps, Identifiable {}

export type FieldProps = {
  type: keyof typeof FieldTypeEnum,
  column: IColumn
}

export interface IField extends FieldProps, Identifiable {}

export type LoginInput = {
  email: string,
  password: string
}

export interface ILoginInput extends LoginInput, Identifiable {}

export type RegisterInput = LoginInput & {name: string, password: string, password_confirmation: string}

export interface IRegisterInput extends RegisterInput, Identifiable {}

export type UserInfoProps = {
  name: string,
  email: string,
  created_at: string,
  email_verified_at: string,
  updated_at: string
}

export interface IUserInfoProps extends UserInfoProps, Identifiable {}

export type UserProps = {
  access_token: string,
  token_type: string,
  user: UserInfoProps
}

export interface Scalable {
  scale: number
}
