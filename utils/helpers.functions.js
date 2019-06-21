export const getDay = date => {
  if (!date || typeof date !== 'object') throw new Error('date not valid')
  switch (date.getDay()) {
    case 0:
      return 'sunday'
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    case 6:
      return 'saturday'
  }
}

export const getMonth = date => {
  if (!date || typeof date !== 'object') throw new Error('date not valid')
  switch (date.getMonth()) {
    case 0:
      return 'january'
    case 1:
      return 'february'
    case 2:
      return 'march'
    case 3:
      return 'april'
    case 4:
      return 'may'
    case 5:
      return 'june'
    case 6:
      return 'july'
    case 7:
      return 'august'
    case 8:
      return 'september'
    case 9:
      return 'october'
    case 10:
      return 'november'
    case 11:
      return 'december'
  }
}
