import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const formatForHuman = (date) => {
  return dayjs(date).format('LLLL')
}

export default formatForHuman
