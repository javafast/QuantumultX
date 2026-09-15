const targetActIds = [
  "OMkOnMLBVgn/QATRJPHeF27t/p4v4wEqu1aJoFVHwyg=",
  "OMkOnMLBVgn/QATRJPHeF2lYQd0hPUXy4pg9dNWPKwE="
];
const targetPeriodIds = ["period_0", "period_1", "period_4", "period_5"];

let obj;
try {
  obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

// 1. 清零指定 act + period 的 used
if (Array.isArray(obj.quota)) {
  obj.quota.forEach(item => {
    if (targetActIds.includes(item.act_id) && targetPeriodIds.includes(item.period_id)) {
      item.used = "0";
    }
  });
}

// 2. 按 sys_time 判断，伪造成已过临界点
const sysTimeStr = obj.sys_time;
if (sysTimeStr) {
  const [datePart, timePart] = sysTimeStr.split(" ");
  const [hh, mm, ss] = timePart.split(":").map(Number);
  const secOfDay = hh * 3600 + mm * 60 + ss;

  const sec_9_50 = 9 * 3600 + 50 * 60;
  const sec_10_00 = 10 * 3600;
  const sec_15_50 = 15 * 3600 + 50 * 60;
  const sec_16_00 = 16 * 3600;

  if (secOfDay > sec_9_50 && secOfDay < sec_10_00) {
    obj.sys_time = `${datePart} 10:00:01`;
  } else if (secOfDay > sec_15_50 && secOfDay < sec_16_00) {
    obj.sys_time = `${datePart} 16:00:00`;
  }
}

$done({ body: JSON.stringify(obj) });
