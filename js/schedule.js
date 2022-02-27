//global variables
let avail;
let tasks = [];
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function main() {
  $("#download").remove();
  //initialize
  tasks.forEach(task => task.scheduledMins = 0);
  document.getElementById('schedule-list').innerHTML = "";
  let errorMsg = document.getElementById('error-msg2');
  errorMsg.innerHTML = "";

  //early return
  avail = getAvail();
  let totalAvail = avail.reduce((a, b) => a + b, 0);

  if (tasks.length == 0) {
    errorMsg.innerHTML = "There are no tasks. Please enter a task."
    return;
  }
  let totalMins = getTotalMins();
  if (totalAvail < totalMins) {
    errorMsg.innerHTML = "You dont have enough availability to generate a schedule. Please increase your availability.";
    return;
  }

  let week = getWeek(totalMins, totalAvail);
  let schedule = getSchedule(week);
  displaySchedule(schedule);
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
  let schedule = [];
  week.forEach(day => {
    let dailySchedule = [];
    let leftOverTime = day.workMins;
    while (leftOverTime > 0) {
      let targetTask = tasks.find(task => task.scheduledMins < task.minutes);
      let unscheduledMins = targetTask.minutes - targetTask.scheduledMins;

      if (leftOverTime >= unscheduledMins) {
        targetTask.scheduledMins += unscheduledMins;
        leftOverTime -= unscheduledMins;
        dailySchedule.push(targetTask.description + ` for ${formatTime(unscheduledMins)}`);
      } else {
        targetTask.scheduledMins += leftOverTime;
        dailySchedule.push(targetTask.description + ` for ${formatTime(leftOverTime)}`);
        leftOverTime = 0;
      }
    }
    schedule.push(dailySchedule);
  });
  return schedule;
}

function displaySchedule(schedule) {
  let scheduleList = document.getElementById('schedule-list');
  for (let i = 0; i < schedule.length; i++) {
    let dailyTasks = schedule[i];
    if (dailyTasks.length == 0) continue;
    scheduleList.innerHTML += "<li><h5>" + days[i] + "</h5></li>";
    dailyTasks.forEach(task => {
      scheduleList.innerHTML += "<li>" + "- " + task + "</li>";
    })
  }
  $("#schedule").append("<button id='download' onclick='dow()' class='btn'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-download' viewBox='0 0 16 16'><path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z'/></svg></button>");

}

function dow() {
  var elmt = document.getElementById('sch-to-export');
  domtoimage.toBlob(elmt).then(function(blob){
    window.saveAs(blob, "schedule.png");
  });
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
  if (minutes > 0) returnStr += " " + minutes + " minutes";

  return returnStr;
}