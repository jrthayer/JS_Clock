function displayClock(){

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    var clock = h+":"+m+":"+s;
    var display = document.querySelector(".clock");

    display.textContent = clock;

    setTimeout(displayClock, 1000);
}

displayClock();