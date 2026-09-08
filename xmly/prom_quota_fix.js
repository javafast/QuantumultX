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

// 1. 改 used
if (Array.isArray(obj.quota)) {
  obj.quota.forEach(item => {
    if (targetActIds.includes(item.act_id) && targetPeriodIds.includes(item.period_id)) {
      item.used = "0";
    }
  });
}

// 2. 按响应体自带的 sys_time 判断时间窗口
const sysTimeStr = obj.sys_time; // "2026-09-08 15:55:52"
const [datePart, timePart] = sysTimeStr.split(" ");
const [hh, mm, ss] = timePart.split(":").map(Number);
const secOfDay = hh * 3600 + mm * 60 + ss;

const sec_9_50 = 9 * 3600 + 50 * 60;   // 09:50:00
const sec_10_00 = 10 * 3600;           // 10:00:00
const sec_15_50 = 15 * 3600 + 50 * 60; // 15:50:00
const sec_16_00 = 16 * 3600;           // 16:00:00

if (secOfDay > sec_9_50 && secOfDay < sec_10_00) {
  obj.sys_time = `${datePart} 10:00:01`;
} else if (secOfDay > sec_15_50 && secOfDay < sec_16_00) {
  obj.sys_time = `${datePart} 16:00:00`;
}

$done({ body: JSON.stringify(obj) });
