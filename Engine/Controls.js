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
    console.log("pages")
    console.log(old_x, old_y)
}

function update_d(dx, dy, width, height){
    dX = dx
    dY = dy
    updateTP(dX, dY)
    old_x = (width*dx)/(-2*Math.PI) + old_x
    old_y = (height*dx)/(-2*Math.PI) + old_y
    console.log("deltas")
    console.log(old_x, old_y)
}

export function setControls(canvas, delta, camera){
    window.addEventListener("keydown", onKeyDown, false)

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
            case 87: {update_d(0.0,-0.5, canvas.width, canvas.height); console.log("W"); break}
            case 83: {update_d(0.0,0.5, canvas.width, canvas.height); console.log("S"); break}
            case 65: {update_d(0.05,0, canvas.width, canvas.height); console.log("A"); break}
            case 68: {update_d(-0.05,0, canvas.width, canvas.height); console.log("D"); break}

            case 187:{camera.zoom(-1); console.log("+"); break}
            case 189:{camera.zoom(1); console.log("-"); break}

            case 81: {update_d(0.05,0, canvas.width, canvas.height); console.log("Q"); break}
            case 69: {update_d(-0.05,0, canvas.width, canvas.height); console.log("E"); break}

            case 76: {delta.camera.x += 5; console.log("L"); break}
            case 74: {delta.camera.x -= 5; console.log("J"); break}
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