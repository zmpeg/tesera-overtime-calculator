var env = require('node-env-file');
var Harvest = require('harvest');
var moment = require('moment');
env(__dirname+'/.env');

if(process.env.SUBDOMAIN && 
   process.env.EMAIL && 
   process.env.PASSWORD && 
   process.env.STARTDATE && 
   process.env.ENDDATE && 
   process.env.USERID) {

  config = {
    subdomain: process.env.SUBDOMAIN,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  };

  var harvest = new Harvest(config);
  var Reports = harvest.Reports;

  start_date = moment(process.env.STARTDATE, "YYYYMMDD");
  now = moment()
  years_at_company = moment.duration(now.diff(start_date));

  hours_overtime = 0
  hours_til = 0
  hours_vac = 0
  hours_vac_accrued = process.env.VACATION_DAYS_PER_YEAR * years_at_company.asYears() * (process.env.HOURS_PER_WEEK/5);


  Reports.timeEntriesByUser({
    "from": process.env.STARTDATE,
    "to": process.env.ENDDATE,
    "user_id": process.env.USERID

  }, function(err, entries) {
      if (err) console.log("Error: "+err, err);
      else {
        entries.forEach(function(val) {

          if (val.day_entry.task_id == 1309780)
            hours_overtime += val.day_entry.hours;
          if (val.day_entry.task_id == 1309778)
            hours_til += val.day_entry.hours;
          if (val.day_entry.task_id == 1309777)
            hours_vac += val.day_entry.hours;
        });

        overtime_balance = hours_overtime-hours_til
        overtime_balance = Math.round(overtime_balance*10)/10;
        vacation_balance = hours_vac_accrued-hours_vac
        vacation_balance = Math.round(vacation_balance*10)/10;
        friendly_vacation_accrued = Math.round(hours_vac_accrued*10)/10;

        console.log("Overtime Accrued:    "+hours_overtime);
        console.log("Overtime Used (TIL): "+hours_til);
        console.log("Vacation Used:       "+hours_vac);
        console.log("Vacation Accrued:    "+friendly_vacation_accrued);
        console.log("");
        console.log("Overtime Balance:    "+overtime_balance+" hours");
        console.log("Vacation Balance:    "+vacation_balance+" hours");
      }
  });

} else {
  console.error('Please set your config. See README.md');
}
