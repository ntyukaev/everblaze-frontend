import { combineReducers } from 'redux'
import sheetScale from './sheetScale'
import selectedSheet from './selectedSheet'

export default combineReducers({
  selectedSheet,
  sheetScale
})
