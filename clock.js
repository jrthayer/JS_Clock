var cDisplay = document.querySelector(".cDisplay");
var aDisplay = document.querySelector(".aDisplay");
var alarmAudio = document.getElementById("alarmNoise");
var alarmBtn = document.getElementById("alarmBtn");
var alarm = document.getElementById("cAlarm");

var aHour;
var aMin;
var adjustRepeat = null;

//clock display functions

function displayClock(){

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    //accounts for single digits minute and hours
    if(m<10) m = "0"+m;
    if(s<10) s = "0"+s;

    var cValue = h+":"+m+":"+s;
    cDisplay.textContent = cValue;

    compareTime();
    setTimeout(displayClock, 1000);
}

displayClock();

//alarm/clock functions
function compareTime(){
    var curTime = cDisplay.textContent.split(":");
    var curAlarm = aDisplay.textContent.split(":");

    if(curTime[0] == curAlarm[0] && curTime[1] == curAlarm[1]){
        alarmAudio.play();
        alarmBtn.classList.remove("hide"); 
        alarmBtn.classList.add("show");
        alarm.classList.add("hide");
        alarm.classList.remove("show"); 
        //ensures interval doesn't get stuck on when user is still 
        //actively adjusting alarm time when it goes off
        release();
    } 
}


//alarm functions
function modifyAlarm(){
    var aArray = aDisplay.textContent.split(":");
    aHour = Number(aArray[0]);
    aMin = Number(aArray[1]);
}

function addHour(){
    modifyAlarm();
    aHour+= 1;
    if(aHour > 23) aHour = 0;
    setAlarm();
}

function subHour(){
    modifyAlarm();
    aHour-= 1;
    if(aHour < 0) aHour = 23;
    setAlarm();
}

function addMin(){
    modifyAlarm();
    aMin += 1;
    if(aMin > 59) aMin = 0;
    setAlarm();
}

function subMin(){
    modifyAlarm();
    aMin -= 1;
    if(aMin < 0) aMin = 59;
    setAlarm();
}

function setAlarm(){
    if(aHour < 10) aHour = "0"+aHour;
    if(aMin <10) aMin = "0" + aMin;
    var aValue = aHour+":"+aMin;
    aDisplay.textContent = aValue;
}

function resetAlarm(){
    alarm.classList.remove("hide"); 
    alarm.classList.add("show");
    alarmBtn.classList.add("hide"); 
    alarmBtn.classList.remove("show");
    aDisplay.textContent = "00:00";
    alarmAudio.pause();

}

//quickly increases alarm value when button is held
function hold(adjustAlarm){
    adjustAlarm();
    adjustRepeat = setInterval(adjustAlarm, 100);
}

function release(){
    clearInterval(adjustRepeat);
}

document.getElementById("addHourBtn").addEventListener("mousedown", function(){hold(addHour)});
document.getElementById("addHourBtn").addEventListener("mouseup", function(){release()});
document.getElementById("addMinBtn").addEventListener("mousedown", function(){hold(addMin)});
document.getElementById("addMinBtn").addEventListener("mouseup", function(){release()});
document.getElementById("subHourBtn").addEventListener("mousedown", function(){hold(subHour)});
document.getElementById("subHourBtn").addEventListener("mouseup", function(){release()});
document.getElementById("subMinBtn").addEventListener("mousedown", function(){hold(subMin)});
document.getElementById("subMinBtn").addEventListener("mouseup", function(){release()});

document.getElementById("alarmBtn").addEventListener("click", function(){resetAlarm()});