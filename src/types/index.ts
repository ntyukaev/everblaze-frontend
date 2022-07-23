export enum ChartTypeEnum {
  LINE_CHART = 'LINE_CHART'
}

export type ChartProps = {
  id: number,
  type: keyof typeof ChartTypeEnum,
  x: number,
  y: number,
  scale: number
}

export enum CellTypeEnum {
  INT,
  FLOAT,
  BOOLEAN,
  STRING
}

export type CellProps = {
  id: number,
  type: keyof typeof CellTypeEnum,
  value: any
}

export interface ColumnProps {
  id: number,
  name: string,
  index: number,
  type: keyof typeof CellTypeEnum,
  cells: CellProps[]
}

export type LoginInput = {
  email: string,
  password: string
}

export type RegisterInput = LoginInput & {name: string, password: string, password_confirmation: string}

export type UserInfoProps = {
  id: number,
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
