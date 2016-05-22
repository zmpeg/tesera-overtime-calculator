var env = require('node-env-file');
var Harvest = require('harvest')
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

  hours_overtime = 0
  hours_til = 0


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
        });

        console.log("Overtime: "+hours_overtime);
        console.log("TIL: "+hours_til);
        console.log("You are at: "+(hours_overtime-hours_til));
      }
  });

} else {
  console.error('Please set your config. See README.md');
}
