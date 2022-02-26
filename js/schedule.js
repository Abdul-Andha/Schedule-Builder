let avail;
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function main() {
  //early return
  let errorMsg = document.getElementById('error-msg');
  avail = getAvail();
  let totalAvail = avail.reduce((a, b) => a + b, 0);
  let totalMins = getTotalMins();

  if (tasks.length == 0) {
    errorMsg.innerHTML = "Please enter a task."
    return;
  }
  if (totalAvail < totalMins) {
    errorMsg.innerHTML = "You dont have enough availability to generate a schedule. Please increase your availability.";
    return;
  }  

  let week = getWeek(totalMins, totalAvail);
  getSchedule(week);
}

function getWeek(totalMins, totalAvail) {
  let workPerMin = totalMins / totalAvail;
  let week = [];
  for (let i = 0; i < days.length; i++) {
    let weekEntry = {
      name: days[i],
      workMins: avail[i] * workPerMin
    }
    week.push(weekEntry);
  }
  return week;
}

function getSchedule(week) {
  let schedule = "";
  week.forEach(day => {
    schedule += day.name + "\n";
    let leftOverTime = day.workMins;
    while (leftOverTime > 0) {
      let targetTask = tasks.find(task => task.scheduledMins < task.minutes);
      let unscheduledMins = targetTask.minutes - targetTask.scheduledMins;

      if (leftOverTime >= unscheduledMins) {
        targetTask.scheduledMins += unscheduledMins;
        leftOverTime -= unscheduledMins;
        schedule += targetTask.description + ` for ${formatTime(unscheduledMins)}\n`;
      } else {
        targetTask.scheduledMins += leftOverTime;
        schedule += targetTask.description + ` for ${formatTime(leftOverTime)}\n`;
        leftOverTime = 0;
      }
    }
    schedule += "\n";
  })
  console.log(schedule);
}

function getTotalMins() {
  let total = 0;
  tasks.forEach((task) => {
    total += task.minutes
  })
  return total;
}

function formatTime(mins) {
  let hours = Math.floor(mins / 60);
  let minutes = Math.round(mins - (hours * 60));
  let returnStr = "";

  if (hours > 0) returnStr += hours + " hours";
  if (minutes > 0)returnStr += " " + minutes + " minutes";

  return returnStr;
}