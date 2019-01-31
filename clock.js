class Clock{
    constructor(clock){
        this.cDisplay = document.getElementById("clckDisplay");
        this.cDisplayAmPm = document.getElementById("clckAmPm");
        this.aDisplay = document.getElementById("alrmDisplay");
        this.aDisplayAmPm = document.getElementById("alrmAmPm");
        this.alarmAudio = document.getElementById("alrmNoise");
        this.alarmBtn = document.getElementById("alrmResetBtn");
        this.alarmToggleBtn = document.getElementById("armBtn");
        this.alarm = document.getElementById("clckAlarm");
        this.alarmState = false;
        this.ampmState = true;
        this.displayColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue("--clckTextColor");
        this.backgroundColor = window.getComputedStyle(document.querySelector("html")).getPropertyValue("--clckBackground");;


        this.aHour;
        this.aMin;
        this.adjustRepeat = null;
    
        document.getElementById("addHourBtn").addEventListener("mousedown", () => this.hold(this.addHour));
        document.getElementById("addMinBtn").addEventListener("mousedown", () => this.hold(this.addMin));
        document.getElementById("subHourBtn").addEventListener("mousedown", () => this.hold(this.subHour));
        document.getElementById("subMinBtn").addEventListener("mousedown", () => this.hold(this.subMin));

        window.addEventListener("mouseup", () => this.release());

        this.alarmBtn.addEventListener("click", () => this.resetAlarm());
        this.alarmToggleBtn.addEventListener("click", () => this.toggleAlarm());
        this.cDisplay.addEventListener("click", () => this.toggleAmPm());

        this.displayClock();
    }

    //clock display functions
    displayClock(){

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
        if(this.ampmState){
            if(h > 12) h = h - 12;
            if(h == 0) h = 12;
        }

        var cValue = h+":"+m+":"+s;
        this.cDisplay.textContent = cValue;
        this.cDisplayAmPm.textContent = amPm;

        this.compareTime();
        setTimeout(() => this.displayClock(), 1000);
    }

    //alarm/clock functions
    compareTime(){
        var curTime = this.cDisplay.textContent.split(":");
        var curAlarm = this.aDisplay.textContent.split(":");
        if(this.alarmState){   
            if(curTime[0] == curAlarm[0] && curTime[1] == curAlarm[1]){
                if(this.ampmState){
                    if(this.cDisplayAmPm.textContent == this.aDisplayAmPm.textContent){
                        this.tripAlarm();
                    }
                }
                else{
                    this.tripAlarm();
                }
            }
        }   
    }

    tripAlarm(){
        this.alarmAudio.play();
        this.alarmBtn.classList.remove("hide"); 
        this.alarmBtn.classList.add("disBlock");
        this.alarm.classList.add("hide");
        this.alarm.classList.remove("disBlock"); 
    }

    //alarm functions
    modifyAlarm(){
        var aArray = this.aDisplay.textContent.split(":");
        this.aHour = Number(aArray[0]);
        this.aMin = Number(aArray[1]);
    }

    addHour(){
        this.modifyAlarm();
        this.aHour+= 1;
        
        if(this.ampmState){
            if(this.aHour > 12){
                this.aHour = 1;
            }
            else if(this.aHour == 12){
                this.toggleAlrmAmPm();
            } 
        }
        else{
            if(this.aHour > 23) this.aHour = 0;
        }
        this.setAlarm();
    }

    subHour(){
        this.modifyAlarm();
        this.aHour-= 1;
        if (this.ampmState){
            if(this.aHour < 1){ 
                this.aHour = 12;
                
            }
            else if(this.aHour == 11){
                this.toggleAlrmAmPm();
            }
        }
        else{
            if(this.aHour < 0) this.aHour = 23;
        }
        this.setAlarm();
    }

    addMin(){
        this.modifyAlarm();
        this.aMin += 1;
        if(this.aMin > 59) this.aMin = 0;
        this.setAlarm();
    }

    subMin(){
        this.modifyAlarm();
        this.aMin -= 1;
        if(this.aMin < 0) this.aMin = 59;
        setAlarm();
    }

    toggleAlrmAmPm(){
        if(this.aDisplayAmPm.textContent == "AM"){
            this.aDisplayAmPm.textContent = "PM";
        }
        else{
            this.aDisplayAmPm.textContent = "AM";
        }
    }

    setAlarm(){
        if(this.aMin <10) this.aMin = "0" + this.aMin;
        var aValue = this.aHour+":"+this.aMin;
        this.aDisplay.textContent = aValue;
    }

    resetAlarm(){
        //hide button and show alarm panel
        this.alarm.classList.remove("hide"); 
        this.alarm.classList.add("disBlock");
        this.alarmBtn.classList.add("hide"); 
        this.alarmBtn.classList.remove("disBlock");
        //reset alarm
        if(this.ampmState){
            this.aDisplay.textContent = "12:00";
            this.aDisplayAmPm.textContent = "AM";

        }
        else{
            this.aDisplay.textContent = "0:00";
        }

        //reset alarm audio
        this.alarmAudio.pause();
        this.alarmAudio.currentTime = 0;
        this.toggleAlarm();
    }

    toggleAlarm(){
        this.alarmState = !this.alarmState;
        if(this.alarmState){
            this.alarmToggleBtn.style.background = this.displayColor;
            this.alarmToggleBtn.style.color = this.backgroundColor;
            this.alarmToggleBtn.innerHTML = "ON";
        }
        else{
            this.alarmToggleBtn.style.background = this.backgroundColor;
            this.alarmToggleBtn.style.color = this.displayColor;
            this.alarmToggleBtn.innerHTML = "OFF";
        }
    }

    //quickly increases alarm value when button is held
    hold(adjustAlarm){
        var localThis = this;
        adjustAlarm.apply(localThis);
        
        
        this.adjustRepeat = setInterval(function(){adjustAlarm.apply(localThis)}, 125);
    }

    release(){
        clearInterval(this.adjustRepeat);
    }

    toggleAmPm(){
        this.ampmState = !this.ampmState;
        if(!this.ampmState){
            this.aDisplayAmPm.classList.remove("disInline");
            this.cDisplayAmPm.classList.remove("disInline");
            this.aDisplayAmPm.classList.add("hide");
            this.cDisplayAmPm.classList.add("hide");
            this.aDisplay.textContent = "0:00";
        }
        else{
            this.aDisplayAmPm.classList.remove("hide");
            this.cDisplayAmPm.classList.remove("hide");
            this.aDisplayAmPm.classList.add("disInline");
            this.cDisplayAmPm.classList.add("disInline");
            this.aDisplay.textContent = "12:00";
        }
    }
}

let test = new Clock(document.getElementsByClassName('clock')[0]);



