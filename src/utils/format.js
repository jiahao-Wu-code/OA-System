import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import rTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(rTime);

export const formatDate = (val, type = 'YYYY年MM月DD日') => {
  val = new Date(val).getTime();
  return dayjs(val).format(type);
};
