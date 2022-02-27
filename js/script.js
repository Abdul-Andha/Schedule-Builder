let enter_task = () => {
    const taskDesc = document.getElementById("task").value;
    const hours = (document.getElementById("hours").value == "select") ? "0h" : document.getElementById("hours").value;
    const minutes = (document.getElementById("minutes").value == "select") ? "0m" : document.getElementById("minutes").value;
    try {
        if (taskDesc == "") {
            throw "Please enter a valid task";
        }
        if (parseInt(hours) * 60 + parseInt(minutes) == 0) {
            throw "Please enter a valid duration";
        }

        //create task
        let task = {
            description: taskDesc,
            minutes: parseInt(hours) * 60 + parseInt(minutes),
            scheduledMins: 0
        }
        tasks.push(task);
        //display task
        let ele = document.getElementById("task-list");
        ele.innerHTML += "<li><input name='checkbox' type='checkbox'>" + taskDesc + " for " + hours + " and " + minutes + "</li>";
        //reset input
        document.getElementById("task").value = "";
        document.getElementById("hours").value = "select";
        document.getElementById("minutes").value = "select";
        $("#error-msg1").text("");
    } catch (err) {
        $("#error-msg1").text(err);
    }
};

let delete_task = () => {
    for(var i=0;i<$(":checkbox").length;i++){
        if ($(":checkbox")[i].checked) {
            $($(":checkbox")[i]).closest('li').remove();
            i--;
        }
    }
};

let check_all =()=>{
    for(var i=0;i<$(":checkbox").length;i++){
        $(":checkbox")[i].checked=true;
    }
}

let inverse =()=>{
    for(var i=0;i<$(":checkbox").length;i++){
        $(":checkbox")[i].checked=!$(":checkbox")[i].checked;
    }
}

function getAvail() {
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let avail = [];
    days.forEach(day => {
        let dailyVal = document.getElementById(day + '-hrs').value;
        avail.push(dailyVal * 60);
    });
    return avail;
}
function displayRange(day) {
    let value = document.getElementById(day + '-hrs').value;
    let label = document.getElementById(day + '-lbl');
    label.innerHTML = value + " hours";
}