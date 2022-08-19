import { CellTypeEnum, ChartTypeEnum, FieldTypeEnum } from './enums'

export type Identity = number | string
export type NullableIdentity = Identity | null
export type NumericTriplet = [number, number, number]

export type ReportProps = {
  name: string
}

export type ChartProps = {
  type: keyof typeof ChartTypeEnum,
  x: number,
  y: number,
  height: number,
  width: number
}

export type SheetProps = {
  index: number,
  name: string
}

export type ColumnProps = {
  name: string,
  index: number,
  type: keyof typeof CellTypeEnum
}

export type DatasetProps = {
  name: string
}

export type FieldProps = {
  type: keyof typeof FieldTypeEnum,
}

export type UserInfoProps = {
  name: string,
  email: string,
  created_at: string,
  email_verified_at: string,
  updated_at: string
}

export type UserProps = {
  access_token: string,
  token_type: string,
  user: UserInfoProps
}
