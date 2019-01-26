var cDisplay = document.getElementById("clckDisplay");
var cDisplayAmPm = document.getElementById("clckAmPm");
var aDisplay = document.getElementById("alrmDisplay");
var aDisplayAmPm = document.getElementById("alrmAmPm");
var alarmAudio = document.getElementById("alrmNoise");
var alarmBtn = document.getElementById("alrmResetBtn");
var alarmToggleBtn = document.getElementById("armBtn");
var alarm = document.getElementById("clckAlarm");
var alarmState = false;
var ampmState = true;
var displayColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue("--clckTextColor");
var backgroundColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue("--clckBackground");;

var aHour;
var aMin;
var adjustRepeat = null;

//clock display functions
function displayClock(){

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var amPm = "AM"

    //accounts for single digits minute and hours
    if(m<10) m = "0"+m;
    if(s<10) s = "0"+s;

    if(h >= 12) amPm = "PM";

    //convert military to am/pm
    if(ampmState){
        if(h > 12) h = h - 12;
        if(h == 0) h = 12;
    }

    var cValue = h+":"+m+":"+s;
    cDisplay.textContent = cValue;
    cDisplayAmPm.textContent = amPm;

    compareTime();
    setTimeout(displayClock, 1000);
}

displayClock();

//alarm/clock functions
function compareTime(){
    var curTime = cDisplay.textContent.split(":");
    var curAlarm = aDisplay.textContent.split(":");
    if(alarmState){   
        if(curTime[0] == curAlarm[0] && curTime[1] == curAlarm[1]){
            if(ampmState){
                if(cDisplayAmPm.textContent == aDisplayAmPm.textContent){
                    tripAlarm();
                }
            }
            else{
                tripAlarm();
            }
        }
    }   
}

function tripAlarm(){
    alarmAudio.play();
    alarmBtn.classList.remove("hide"); 
    alarmBtn.classList.add("disBlock");
    alarm.classList.add("hide");
    alarm.classList.remove("disBlock"); 
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
    if(ampmState){
        if(aHour > 12){
            aHour = 1;
        }
        else if(aHour == 12){
            toggleAlrmAmPm();
        } 
    }
    else{
        if(aHour > 23) aHour = 0;
    }
    setAlarm();
}

function subHour(){
    modifyAlarm();
    aHour-= 1;
    if (ampmState){
        if(aHour < 1){ 
            aHour = 12;
            
        }
        else if(aHour == 11){
            toggleAlrmAmPm();
        }
    }
    else{
        if(aHour < 0) aHour = 23;
    }
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

function toggleAlrmAmPm(){
    if(aDisplayAmPm.textContent == "AM"){
        aDisplayAmPm.textContent = "PM";
    }
    else{
        aDisplayAmPm.textContent = "AM";
    }
}

function setAlarm(){
    if(aMin <10) aMin = "0" + aMin;
    var aValue = aHour+":"+aMin;
    aDisplay.textContent = aValue;
}

function resetAlarm(){
    //hide button and show alarm panel
    alarm.classList.remove("hide"); 
    alarm.classList.add("disBlock");
    alarmBtn.classList.add("hide"); 
    alarmBtn.classList.remove("disBlock");
    //reset alarm
    if(ampmState){
        aDisplay.textContent = "12:00";
        aDisplayAmPm.textContent = "AM";

    }
    else{
        aDisplay.textContent = "0:00";
    }

    //reset alarm audio
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    toggleAlarm();
}

function toggleAlarm(){
    alarmState = !alarmState;
    if(alarmState){
        alarmToggleBtn.style.background = displayColor;
        alarmToggleBtn.style.color = backgroundColor;
        alarmToggleBtn.innerHTML = "ON";
    }
    else{
        alarmToggleBtn.style.background = backgroundColor;
        alarmToggleBtn.style.color = displayColor;
        alarmToggleBtn.innerHTML = "OFF";
    }
}

//quickly increases alarm value when button is held
function hold(adjustAlarm){
    adjustAlarm();
    adjustRepeat = setInterval(adjustAlarm, 125);
}

function release(){
    clearInterval(adjustRepeat);
}

function toggleAmPm(){
    ampmState = !ampmState;
    if(!ampmState){
        aDisplayAmPm.classList.remove("disInline");
        cDisplayAmPm.classList.remove("disInline");
        aDisplayAmPm.classList.add("hide");
        cDisplayAmPm.classList.add("hide");
        aDisplay.textContent = "0:00";
    }
    else{
        aDisplayAmPm.classList.remove("hide");
        cDisplayAmPm.classList.remove("hide");
        aDisplayAmPm.classList.add("disInline");
        cDisplayAmPm.classList.add("disInline");
        aDisplay.textContent = "12:00";
    }
}

document.getElementById("addHourBtn").addEventListener("mousedown", function(){hold(addHour);});
document.getElementById("addMinBtn").addEventListener("mousedown", function(){hold(addMin);});
document.getElementById("subHourBtn").addEventListener("mousedown", function(){hold(subHour);});
document.getElementById("subMinBtn").addEventListener("mousedown", function(){hold(subMin);});

window.addEventListener("mouseup", function(){release();});

alarmBtn.addEventListener("click", function(){resetAlarm();});
alarmToggleBtn.addEventListener("click", function(){toggleAlarm();});
cDisplay.addEventListener("click", function(){toggleAmPm();});