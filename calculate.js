var Harvest = require('harvest'),
    harvest = new Harvest({
        subdomain: "teserasystems",
        email: "email",
        password: "password"
    }),
    Reports = harvest.Reports;

hours_overtime = 0
hours_til = 0


Reports.timeEntriesByUser({
  "from": "20151108",
  "to": "20160404",
  "user_id": "1138304"

}, function(err, entries) {
    if (err) throw new Error(err);
    entries.forEach(function(val) {

      if (val.day_entry.task_id == 1309780)
        hours_overtime += val.day_entry.hours;
      if (val.day_entry.task_id == 1309778)
        hours_til += val.day_entry.hours;
    });

    console.log("Overtime: "+hours_overtime);
    console.log("TIL: "+hours_til);
    console.log("You are at: "+(hours_overtime-hours_til));
});
