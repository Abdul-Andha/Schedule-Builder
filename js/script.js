let tasks = [];

let enter_task = () => {
    const taskDesc = document.getElementById("task").value;
    const hours = document.getElementById("hours").value;
    const minutes = document.getElementById("minutes").value;
    
    let taskEntry = {
        description: taskDesc,
        minutes: (hours * 60) + parseInt(minutes),
        scheduledMins: 0
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
