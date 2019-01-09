var cDisplay = document.getElementById("cDisplay");
var aDisplay = document.getElementById("aDisplay");
var alarmAudio = document.getElementById("alarmNoise");
var alarmBtn = document.getElementById("aBtn");
var alarmToggleBtn = document.getElementById("armBtn");
var alarm = document.getElementById("cAlarm");
var alarmState = false;
var displayColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue("--displayColor");
var backgroundColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue("--displayBackground");;

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

    if(curTime[0] == curAlarm[0] && curTime[1] == curAlarm[1] && alarmState){
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
    if(aMin <10) aMin = "0" + aMin;
    var aValue = aHour+":"+aMin;
    aDisplay.textContent = aValue;
}

function resetAlarm(){
    alarm.classList.remove("hide"); 
    alarm.classList.add("show");
    alarmBtn.classList.add("hide"); 
    alarmBtn.classList.remove("show");
    aDisplay.textContent = "0:00";
    alarmAudio.pause();
}

function toggleAlarm(){
    alarmState = !alarmState;
    if(alarmState)
    {
        alarmToggleBtn.style.background = displayColor;
        alarmToggleBtn.style.color = backgroundColor;
        alarmToggleBtn.innerHTML = "ON";
    }
    else
    {
        alarmToggleBtn.style.background = backgroundColor;
        alarmToggleBtn.style.color = displayColor;
        alarmToggleBtn.innerHTML = "OFF";
    }
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
document.getElementById("addMinBtn").addEventListener("mousedown", function(){hold(addMin)});
document.getElementById("subHourBtn").addEventListener("mousedown", function(){hold(subHour)});
document.getElementById("subMinBtn").addEventListener("mousedown", function(){hold(subMin)});

window.addEventListener("mouseup", function(){release()});

aBtn.addEventListener("click", function(){resetAlarm()});
alarmToggleBtn.addEventListener("click", function(){toggleAlarm()});