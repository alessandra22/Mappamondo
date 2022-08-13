let drag
let THETA = degToRad(50), PHI = degToRad(30)
let old_x, old_y
let dX, dY

function degToRad(d) {
    return (d * Math.PI) / 180
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
        dX = (-(e.pageX - old_x) * 2 * Math.PI) / canvas.width
        dY = (-(e.pageY - old_y) * 2 * Math.PI) / canvas.height
        THETA += dX
        PHI += dY
        old_x = e.pageX
        old_y = e.pageY
        e.preventDefault()
        console.log(THETA, PHI)
    }

    function onKeyDown(e) {
        switch(e.keyCode){
            case 87: {delta.objects.y += 0.5; console.log("W"); break}
            case 83: {delta.objects.y -= 0.5; console.log("S"); break}
            case 65: {delta.objects.x -= 0.5; console.log("A"); break}
            case 68: {delta.objects.x += 0.5; console.log("D"); break}

            case 187:{camera.zoom(-1); console.log("+"); break}
            case 189:{camera.zoom(1); console.log("-"); break}

            case 81: {camera.rotate(5); console.log("Q"); break}
            case 69: {camera.rotate(-5); console.log("E"); break}

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