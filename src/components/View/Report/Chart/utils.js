export const getColumnNames = (fields) => {
  const count = {}
  return fields.map((field) => {
    let name = field.column.name
    if (name in count) {
      name = `${name} (${count[name]})`
      count[name] += 1
    } else {
      count[name] = 1
    }
    return name
  })
}

export const fieldsSameLength = (fields) => {
  const fieldLengths = fields.map((field) => field.column.cells.length)
  return fieldLengths.every((f) => fieldLengths[0] === f)
}

export const getInputData = (fields, columnNames) => {
  const data = Array.from({ length: fields[0].column.cells.length }, () => { return {} })
  return fields.reduce((acc, cur, fieldIndex) => {
    cur.column.cells.forEach((cell, cellIndex) => {
      const columnName = columnNames[fieldIndex]
      acc[cellIndex][columnName] = cell.value
    })
    return acc
  }, data)
}

export const getFieldMapping = (fields, columnNames) => {
  return fields.reduce((acc, cur, fieldIndex) => {
    const { type } = cur
    if (!acc[type]) {
      acc[type] = []
    }
    const columnName = columnNames[fieldIndex]
    acc[type].push(columnName)
    return acc
  }, {})
}
