import moment from 'moment'
import 'moment/locale/pt-br'

const formattedDate = (date, pattern) => moment(date).format(pattern)

export default formattedDate
