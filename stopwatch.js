let [milliseconds, second, minute,] = [0, 0, 0]; // inializing variables
let timerRef = document.querySelector('.setTimer');
let int = null; // initial values are null

document.getElementById('start').addEventListener('click', () => { //start timer
    if (int !== null) { // value is no longer null once start button is clicked
        clearInterval(int);
    }
    int = setInterval(setTimer, 10);
});
document.getElementById('stop').addEventListener('click', () => { //stop timer
    clearInterval(int);
});
document.getElementById('reset').addEventListener('click', () => { //reset timer
    clearInterval(int); 
    [milliseconds, seconds, minutes, hours] = [0, 0, 0]; // starting integers
    timerRef.innerHTML = '00 : 00 : 00';
});

function setTimer() {  // for counting time 
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        second++;
        if (second == 60) {
            second = 0;
            minute++;
            if (minute == 60) {
                minute = 0;
            }
        }
    }
    
    // equations for time amount 
    let m = minute < 10 ? "0" + minute : minute;
    let s = second < 10 ? "0" + second : second;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timerRef.innerHTML = ` ${m} : ${s} : ${ms}`;
}