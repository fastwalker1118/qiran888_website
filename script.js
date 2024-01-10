/*
let starthour = 0;
let startmin = 10;
let dumiao_times_b = 0;
let dumiao_times_w = dumiao_times_b;
let startsec = 0;
let dumiao = 0;
*/

let starthour = parseInt(localStorage.getItem('starthour')) || 0;
let startmin = parseInt(localStorage.getItem('startmin')) || 10;
let dumiao_times_b = parseInt(localStorage.getItem('dumiao_times_b')) || 0;
let dumiao = parseInt(localStorage.getItem('dumiao')) || 0;
let dumiao_times_w = dumiao_times_b;
let startsec = 0;

if(starthour == 0){
    document.getElementById('time_white').innerHTML = `${startmin}:00`;
    document.getElementById('time_black').innerHTML = `${startmin}:00`;
}
else{
    document.getElementById('time_white').innerHTML = `0${starthour}:${startmin}:00`;
    document.getElementById('time_black').innerHTML = `0${starthour}:${startmin}:00`;
}
document.getElementById('dumiao_b').innerHTML = `+${dumiao_times_b}x${dumiao}s`;
document.getElementById('dumiao_w').innerHTML = `+${dumiao_times_w}x${dumiao}s`;

ongoing = 0;

/*clicking anywhere in division top, timer switch from white to black*/
function stb(){
    dumiao_b = dumiao;
    if(time_w == -1){
        document.getElementById('time_white').innerHTML = `${dumiao}`;
    }
    if(ongoing == 1){
        pause_w();
        start_b();
    }
}

/*clicking anywhere in division bottom, timer switch from black to white*/
function stw(){
    dumiao_w = dumiao;
    if(time_b == -1){
        document.getElementById('time_black').innerHTML = `${dumiao}`;
    }
    if(ongoing == 2){
        pause_b();
        start_w();
    }
}

let time_w = starthour*3600+startmin*60+startsec; 
let time_b = time_w;

function start(){
    if(ongoing == 1){
        start_w();
    }
    else{
        start_b();
    }
}

function start_w(){
    ongoing = 1; /*1=white 2=black*/
    interval_w = setInterval(updatecountdown_white, 1000);
    document.getElementById('start').disabled = true;
}

function start_b(){
    ongoing = 2;
    interval_b = setInterval(updatecountdown_black, 1000);
    document.getElementById('start').disabled = true;
}

function pause(){
    if(ongoing == 1){
        pause_w();
    }
    if(ongoing == 2){
        pause_b();
    }
    document.getElementById('start').disabled = false;
}

function pause_w(){
    clearInterval(interval_w);
}

function pause_b(){
    clearInterval(interval_b);
}

function reset(){
    ongoing = 0;
    document.getElementById('time_white').innerHTML = `${starthour}:${startmin}:${startsec}`;
    document.getElementById('time_black').innerHTML = `${starthour}:${startmin}:${startsec}`;
    document.getElementById('start').disabled = false;
    time_w = starthour*3600+startmin*60+startsec; 
    time_b = starthour*3600+startmin*60+startsec; 
    clearInterval(interval_w);
    clearInterval(interval_b);
}
  
dumiao_w = dumiao;
function updatecountdown_white(){
    //读秒feature
    if(time_w == -1){ //set to -1 since we want the last second to finish
        if (dumiao_w == -1){
            dumiao_times_w--;
            document.getElementById('dumiao_w').innerHTML = `+${dumiao_times_w}x${dumiao}s`;
            if (dumiao_times_w == 0){
                lose()
                reset()
            }
            dumiao_w = dumiao;
        }
        document.getElementById('time_white').innerHTML = `${dumiao_w}`;
        dumiao_w--;
    }
    else{
        let hours = Math.floor(time_w/3600); 
        let minutes = Math.floor(time_w/60); 
        let seconds = time_w%60; 
        if(seconds < 10){
            seconds = `${0}${seconds}`;
        }
        if(minutes < 10){
            minutes = `${0}${minutes}`;
        }
        if(hours == 0){
            hours = `${0}${hours}`;
            document.getElementById('time_white').innerHTML = `${minutes}:${seconds}`;
        }
        else{
            document.getElementById('time_white').innerHTML = `${hours}:${minutes}:${seconds}`;
        }
        time_w--;
    }
}

dumiao_b = dumiao;
function updatecountdown_black(){
    //读秒feature
    if(time_b == -1){ //set to -1 since we want the last second to finish
        if (dumiao_b == -1){
            dumiao_times_b--;
            document.getElementById('dumiao_b').innerHTML = `+${dumiao_times_b}x${dumiao}s`;
            if (dumiao_times_b == 0){
                lose()
                reset()
            }
            dumiao_b = dumiao;
        }
        document.getElementById('time_black').innerHTML = `${dumiao_b}`;
        dumiao_b--;
    }
    else{
        //regular time feature
        let hours = Math.floor(time_b/3600); 
        let minutes = Math.floor(time_b/60); 
        let seconds = time_b%60; 

        if(seconds < 10){
            seconds = `${0}${seconds}`;
        }
        if(minutes < 10){
            minutes = `${0}${minutes}`;
        }
        if(hours == 0){
            document.getElementById('time_black').innerHTML = `${minutes}:${seconds}`;
        }
        else{
            document.getElementById('time_black').innerHTML = `${hours}:${minutes}:${seconds}`;
        }
        time_b--;
    }
}

function beep() {
    var audio = new Audio('audio_file.mp3');
    audio.play();
}

function lose(){
    var audio = new Audio('overtime.mp3');
    audio.play();
}