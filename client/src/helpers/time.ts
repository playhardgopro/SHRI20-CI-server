type dataTime = string | number

const options = {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}

export const getDate = (time: string, currentLocale: 'ru' | 'en') => {
  const date = new Date(time)
  return date.toLocaleString(currentLocale, options)
}

export const getDuration = (time: number, currentLocale: 'ru' | 'en') => {
  let timeParam: { h: string; m: string; s: string }

  if (currentLocale === 'ru') {
    timeParam = {
      h: 'ч',
      m: 'мин',
      s: 'сек',
    }
  } else {
    timeParam = {
      h: 'h',
      m: 'min',
      s: 'sec',
    }
  }
  let hours: dataTime = (time / 3600000) ^ 0
  let minute: dataTime = ((time / 60000) ^ 0) - hours * 60
  let seconds: dataTime = ((time / 1000) ^ 0) - minute * 60

  hours >= 1 ? (hours = `${hours} ${timeParam.h} `) : (hours = '')

  minute >= 1 ? (minute = `${minute} ${timeParam.m} `) : (minute = '')

  if (hours === '') {
    if (seconds < 1) {
      return minute
    }
    return minute + seconds + ' ' + timeParam.s
  }

  return hours + minute
}
