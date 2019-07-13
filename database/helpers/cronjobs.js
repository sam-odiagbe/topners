const cron = require("node-cron");

cron.schedule("2 * * * * *", () => {
  console.log("run this every 30 secs");
});

cron.schedule("* * * * *", () => {
  console.log("Building great software is great");
});

// cron job for upadating questions
