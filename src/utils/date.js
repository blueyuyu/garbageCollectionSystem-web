/* eslint-disable quotes */
/* eslint-disable no-array-constructor */
/* eslint-disable spaced-comment */

// formatFunction(new Date(), "yyyy-MM-dd hh:mm:ss") 使用方法
export function formatFunction(date, fmt) {
  if (/(y+)/.test(fmt)) {
      const t = /(y+)/.exec(fmt)[1];
      fmt = fmt.replace(
          t,
          (date.getFullYear() + "").substring(4 - t.length)
      );
  }

  const o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
  };
  for (let k in o) {
      const regx = new RegExp("(" + k + ")");
      if (regx.test(fmt)) {
          const t = regx.exec(fmt)[1];
          fmt = fmt.replace(
              t,
              t.length == 1 ? o[k] : ("00" + o[k]).substring(("" + o[k]).length)
          );
      }
  }
  return fmt;
};

/**
 * 
 * @param {Array} data [2024,5,1,10,50,90] 传入的一个年月日时分秒数组，要求返回‘’
 * @returns yyyy-MM-dd hh:mm:ss
 */
export function formatDate(data) {
  const year = data[0];
  const month = data[1];
  const day = data[2];
  const hour = data[3];
  const minute = data[4];
  const second = data[5];

  const formattedDate = `${year}-${padZero(month)}-${padZero(day)}`;
  const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;

  return `${formattedDate} ${formattedTime}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

export function Todate(num) { //Fri Oct 31 18:00:00 UTC+0800 2008
  num = num + ''
  var date = ''
  var month = new Array()
  month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6
  month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12
  var week = new Array()
  week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日"
  const str = num.split(" ")
  date = str[3] + "-"
  date = date + month[str[1]] + "-" + str[2] + " " + str[4]
  return date
}

export function GetWeekdate(intime) { //Fri Oct 31 18:00:00 UTC+0800 2008
  
  var dateString = intime;
  var dateObject = new Date(dateString);
  dateObject.getDay()//返回值是 0（周日） 到 6（周六） 之间的一个整数。
  return dateObject.getDay()
}
