//test data
let tasks = [
  {
    description: 'task #1',
    hours: 2,
    scheduledHrs: 0
  },
  {
    description: 'task #2',
    hours: 4,
    scheduledHrs: 0
  },
  {
    description: 'task #3',
    hours: 6.5,
    scheduledHrs: 0
  },
  {
    description: 'task #4',
    hours: 0.5,
    scheduledHrs: 0
  },
  {
    description: 'task #5',
    hours: 12,
    scheduledHrs: 0
  },
  {
    description: 'task #6',
    hours: 0.22,
    scheduledHrs: 0
  },
  {
    description: 'task #7',
    hours: 0.1,
    scheduledHrs: 0
  },
];
let avail = [3, 7, 2, 3, 5, 6, 4];
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function main() {
  //early return
  let totalAvail = avail.reduce((a, b) => a + b, 0);
  let totalHours = getTotalHours();
  if (totalAvail < totalHours) {
    console.log("Error: You dont have enough availability to generate a schedule. Reduce a task or increase your availability.");
    return;
  }  

  let week = getWeek(totalHours, totalAvail);
  console.log(week);
  getSchedule(week);
}

function getWeek(totalHours, totalAvail) {
  let workPerHour = totalHours / totalAvail;
  let week = [];
  for (let i = 0; i < days.length; i++) {
    let weekEntry = {
      name: days[i],
      workHours: avail[i] * workPerHour
    }
    week.push(weekEntry);
  }
  return week;
}

function getSchedule(week) {
  let schedule = "";
  week.forEach(day => {
    schedule += day.name + "\n";
    let leftOverTime = day.workHours;
    while (leftOverTime > 0) {
      let targetTask = tasks.find(task => task.scheduledHrs < task.hours);
      let unscheduledHrs = targetTask.hours - targetTask.scheduledHrs;

      if (leftOverTime >= unscheduledHrs) {
        targetTask.scheduledHrs += unscheduledHrs;
        leftOverTime -= unscheduledHrs;
        schedule += targetTask.description + ` for ${formatTime(unscheduledHrs)}\n`;
      } else {
        targetTask.scheduledHrs += leftOverTime;
        schedule += targetTask.description + ` for ${formatTime(leftOverTime)}\n`;
        leftOverTime = 0;
      }
    }
    schedule += "\n";
  })
  console.log(schedule);
  console.log(tasks);
}

function getTotalHours() {
  let total = 0;
  tasks.forEach((task) => {
    total += task.hours
  })
  return total;
}

function formatTime(hours) {
  let finalHours = Math.floor(hours)
  let minutes = Math.round((hours - finalHours) * 60);
  let returnStr = "";

  if (finalHours > 0) returnStr += finalHours + " hours";
  if (minutes > 0)returnStr += " " + minutes + " minutes";

  return returnStr;
}

main();