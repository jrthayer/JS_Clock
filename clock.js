var cDisplay = document.getElementById("cDisplay");
var cDisplayAmPm = document.getElementById("clkAmPm");
var aDisplay = document.getElementById("aDisplay");
var aDisplayAmPm = document.getElementById("alrmAmPm");
var alarmAudio = document.getElementById("alarmNoise");
var alarmBtn = document.getElementById("aBtn");
var alarmToggleBtn = document.getElementById("armBtn");
var alarm = document.getElementById("cAlarm");
var alarmState = false;
var ampmState = true;
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

    //changes am/pm at the start of each hour
    if(m == 0 && s == 0) determineAmPm();

    //accounts for single digits minute and hours
    if(m<10) m = "0"+m;
    if(s<10) s = "0"+s;

    //convert military to am/pm
    if(ampmState){
        if(h > 12) h = h - 12;
        if(h == 0) h = 12;
    }

    var cValue = h+":"+m+":"+s;
    cDisplay.textContent = cValue;

    compareTime();
    setTimeout(displayClock, 1000);
}

function determineAmPm(hours){
    var d = new Date();
    var h = d.getHours();
    if (h<=11){
        cDisplayAmPm.textContent = "AM";
    }
    else{
        cDisplayAmPm.textContent = "PM";
    }
}

displayClock();
determineAmPm();

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
    alarmBtn.classList.add("show");
    alarm.classList.add("hide");
    alarm.classList.remove("show"); 
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
    alarm.classList.remove("hide"); 
    alarm.classList.add("show");
    alarmBtn.classList.add("hide"); 
    alarmBtn.classList.remove("show");
    if(ampmState){
        aDisplay.textContent = "12:00";
        aDisplayAmPm.textContent = "AM";

    }
    else{
        aDisplay.textContent = "0:00";
    }
    alarmAudio.pause();
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
    adjustRepeat = setInterval(adjustAlarm, 100);
}

function release(){
    clearInterval(adjustRepeat);
}

function toggleAmPm(){
    ampmState = !ampmState;
    if(!ampmState){
        aDisplayAmPm.classList.remove("amPm");
        cDisplayAmPm.classList.remove("amPm");
        aDisplayAmPm.classList.add("hide");
        cDisplayAmPm.classList.add("hide");
        aDisplay.textContent = "0:00";
    }
    else{
        aDisplayAmPm.classList.remove("hide");
        cDisplayAmPm.classList.remove("hide");
        aDisplayAmPm.classList.add("amPm");
        cDisplayAmPm.classList.add("amPm");
        aDisplay.textContent = "12:00";
    }
}

document.getElementById("addHourBtn").addEventListener("mousedown", function(){hold(addHour);});
document.getElementById("addMinBtn").addEventListener("mousedown", function(){hold(addMin);});
document.getElementById("subHourBtn").addEventListener("mousedown", function(){hold(subHour);});
document.getElementById("subMinBtn").addEventListener("mousedown", function(){hold(subMin);});

window.addEventListener("mouseup", function(){release();});

aBtn.addEventListener("click", function(){resetAlarm();});
alarmToggleBtn.addEventListener("click", function(){toggleAlarm();});
cDisplay.addEventListener("click", function(){toggleAmPm();});