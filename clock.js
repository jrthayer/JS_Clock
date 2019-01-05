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
    var cText = document.querySelector(".cDisplay");
    cText.textContent = cValue;

    setTimeout(displayClock, 1000);
}

displayClock();

//alarm functions
var alarm;
var aHour;
var aMin;
var adjustRepeat = null;

function modifyAlarm(){
    alarm = document.querySelector(".cAlarm").textContent;
    var aArray = alarm.split(":");
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
    alarm = aHour+":"+aMin;
    document.querySelector(".cAlarm").textContent = alarm;
}

//quickly increases alarm value when button is held
function hold(adjustAlarm){
    adjustAlarm();
    adjustRepeat = setInterval(adjustAlarm, 100);
}

function release(){
    clearInterval(adjustRepeat);
}

// document.getElementById("addHourBtn").addEventListener("click", function(){addHour()});
// document.getElementById("addMinBtn").addEventListener("click", function(){addMin()});
// document.getElementById("subHourBtn").addEventListener("click", function(){subHour()});
// document.getElementById("subMinBtn").addEventListener("click", function(){subMin()});

document.getElementById("addHourBtn").addEventListener("mousedown", function(){hold(addHour)});
document.getElementById("addHourBtn").addEventListener("mouseup", function(){release()});
document.getElementById("addMinBtn").addEventListener("mousedown", function(){hold(addMin)});
document.getElementById("addMinBtn").addEventListener("mouseup", function(){release()});
document.getElementById("subHourBtn").addEventListener("mousedown", function(){hold(subHour)});
document.getElementById("subHourBtn").addEventListener("mouseup", function(){release()});
document.getElementById("subMinBtn").addEventListener("mousedown", function(){hold(subMin)});
document.getElementById("subMinBtn").addEventListener("mouseup", function(){release()});