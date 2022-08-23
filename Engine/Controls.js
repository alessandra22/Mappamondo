import {curr_time, setTime, setAuto} from "./Engine.js";

let drag
let THETA = degToRad(50), PHI = degToRad(30)
let old_x=0, old_y=0
let dX, dY

export {THETA, PHI}

function degToRad(d) {
    return (d * Math.PI) / 180
}

function updateTP(dx, dy){
    THETA += dx
    PHI -= dy
    if (PHI > degToRad(75)) PHI = degToRad(75)
    if (PHI < degToRad(35)) PHI = degToRad(35)
}

function update_pages(pageX, pageY, width, height){
    dX = (-(pageX - old_x) * 2 * Math.PI) / width
    dY = (-(pageY - old_y) * 2 * Math.PI) / height
    updateTP(dX,dY)
    old_x = pageX
    old_y = pageY
}

function update_d(dx, dy, width, height){
    dX = dx
    dY = dy
    updateTP(dX, dY)
    old_x = (width*dx)/(-2*Math.PI) + old_x
    old_y = (height*dx)/(-2*Math.PI) + old_y
}

export function setControls(canvas, delta, camera){
    window.addEventListener("keydown", onKeyDown, false)

    let zoom_in = function(){ camera.zoom(1) }
    let zoom_out = function(){ camera.zoom(-1) }

    let rotate_left =  function(){ update_d(0.25,  0, canvas.width, canvas.height) }
    let rotate_right = function(){ update_d(-0.25, 0, canvas.width, canvas.height) }
    let rotate_up =    function(){ update_d(0  , 0.5, canvas.width, canvas.height) }
    let rotate_down =  function(){ update_d(0  ,-0.5, canvas.width, canvas.height) }

    let time_auto = function()  { setAuto(true)  }
    let time_stop = function()  { setAuto(false) }
    let time_up = function()    { time_stop(); setTime(curr_time+1) }
    let time_down = function()  { time_stop(); if(curr_time!==0) setTime(curr_time-1) }
    let time_reset = function() { time_stop(); setTime(0)}


    document.getElementById("zoom_in").onclick = zoom_in
    document.getElementById("zoom_out").onclick = zoom_out

    document.getElementById("rotate_left").onclick = rotate_left
    document.getElementById("rotate_right").onclick = rotate_right
    document.getElementById("rotate_up").onclick = rotate_up
    document.getElementById("rotate_down").onclick = rotate_down

    document.getElementById("time_up").onclick = time_up
    document.getElementById("time_down").onclick = time_down
    document.getElementById("time_auto").onclick = time_auto
    document.getElementById("time_stop").onclick = time_stop
    document.getElementById("time_reset").onclick = time_reset


    canvas.onmousedown = function (e) {
        drag = true
        old_x = e.pageX
        old_y = e.pageY
        e.preventDefault()
        return false
    }

    canvas.onmouseup = function () {
        drag = false
    }

    canvas.onmousemove = function (e) {
        if (!drag) return false
        update_pages(e.pageX, e.pageY, canvas.width, canvas.height)
        e.preventDefault()
    }

    function onKeyDown(e) {
        switch(e.keyCode){
            case 87: {rotate_up(); console.log("W"); break}
            case 83: {rotate_down(); console.log("S"); break}
            case 65: {rotate_left(); console.log("A"); break}
            case 68: {rotate_right(); console.log("D"); break}

            case 187:{zoom_in(); console.log("+"); break}
            case 189:{zoom_out(); console.log("-"); break}
        }
    }
}
/*
    i = 73
    j = 74
    k = 75
    l = 76
    q = 81
    e = 69
*/