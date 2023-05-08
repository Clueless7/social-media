import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const timeFromNow = (date, excludeSuffix) => {
  return dayjs(date).fromNow(excludeSuffix)
}

export default timeFromNow
