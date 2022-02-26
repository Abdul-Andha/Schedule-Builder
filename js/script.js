let enter_task = () => {
    const task = document.getElementById("task").value;
    const day = document.getElementById("days").value;
    const hour = document.getElementById("hours").value;
    const minute = document.getElementById("minutes").value;
    
    if (day == "Sunday") {
        let ele = document.getElementById("sunday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else if (day == "Monday") {
        let ele = document.getElementById("monday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else if (day == "Tuesday") {
        let ele = document.getElementById("tuesday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else if (day == "Wednesday") {
        let ele = document.getElementById("wednesday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else if (day == "Thursday") {
        let ele = document.getElementById("thursday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else if (day == "Friday") {
        let ele = document.getElementById("friday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else if (day == "Saturday") {
        let ele = document.getElementById("saturday");
        ele.innerHTML += task + " for " + hour + " and " + minute + "<br>";
    }
    else {
        // pass
    }
};
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
