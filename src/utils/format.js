import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import rTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(rTime);

export const formatDate = (val, type = 'YYYY年MM月DD日') => {
  val = new Date(val).getTime();
  return dayjs(val).format(type);
};

export const formatBirth = (val) => {
  let birthday = '';
  if (val?.length === 15) {
    birthday = '19' + val.slice(6, 12);
  } else if (val?.length === 18) {
    birthday = val.slice(6, 14);
  } else {
    return '1993';
  }
  birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
  return birthday;
};

export const formatYear = (val, type) => {
  let year = '';
  const dateNow = new Date();
  if (type === 'age') {
    year = formatBirth(val);
  }
  return dateNow.getFullYear() - year.substring(0, 4);
};
