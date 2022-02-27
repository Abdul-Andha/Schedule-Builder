let tasks = [];

let enter_task = () => {
    const taskDesc = document.getElementById("task").value;
<<<<<<< Updated upstream
    const hours = document.getElementById("hours").value;
    const minutes = document.getElementById("minutes").value;
    
    let taskEntry = {
        description: taskDesc,
        minutes: (hours * 60) + parseInt(minutes),
        scheduledMins: 0
=======
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
>>>>>>> Stashed changes
    }
    
    tasks.push(taskEntry);
    document.getElementById("task-form").reset;
    
    // if (day == "Sunday") {
    //     let ele = document.getElementById("sunday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else if (day == "Monday") {
    //     let ele = document.getElementById("monday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else if (day == "Tuesday") {
    //     let ele = document.getElementById("tuesday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else if (day == "Wednesday") {
    //     let ele = document.getElementById("wednesday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else if (day == "Thursday") {
    //     let ele = document.getElementById("thursday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else if (day == "Friday") {
    //     let ele = document.getElementById("friday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else if (day == "Saturday") {
    //     let ele = document.getElementById("saturday");
    //     ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    // }
    // else {
    //     // pass
    // }
};
<<<<<<< Updated upstream
=======

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

>>>>>>> Stashed changes
function getAvail() {
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let avail = [];
    days.forEach(day => {
        let dailyVal = document.getElementById(day + '-hrs').value;
        avail.push(dailyVal * 60);
    });
    return avail;
}
$(function(){
    $(":submit").click(function(){
        var elmt=document.getElementById('form');
        domtoimage.toPng(elmt)
        .then(function(dataUrl){
            var img=new Image();
            img.src=dataUrl;
            document.body.appendChild(img);
        })
        .catch(function(error){
            console.error('error function', error);
        })
    });
});
function displayRange(day) {
    let value = document.getElementById(day + '-hrs').value;
    let label = document.getElementById(day + '-lbl');
    label.innerHTML = value + " hours";
}
