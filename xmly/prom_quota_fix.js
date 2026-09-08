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

if (Array.isArray(obj.quota)) {
  obj.quota.forEach(item => {
    if (targetActIds.includes(item.act_id) && targetPeriodIds.includes(item.period_id)) {
      item.used = "0";
    }
  });
}

$done({ body: JSON.stringify(obj) });
