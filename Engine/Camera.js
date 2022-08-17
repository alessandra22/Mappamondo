import {THETA, PHI} from "./Controls.js"

export class Camera {

    constructor(position, up, target, radius, fieldOfView, delta) {
        this.position = position
        this.up = up
        this.target = target
        this.radius = radius
        this.fieldOfView = fieldOfView
        this.delta = delta.camera
    }

    zoom() {
        this.radius *= Math.cos(PHI);
    }

    // Compute the camera's matrix using look at.
    cameraMatrix() {
        this.position[0] = (Math.cos(THETA) * this.radius) + this.delta.x
        this.position[1] = (Math.sin(THETA) * this.radius) + this.delta.y
        this.position[2] = Math.sin(PHI) + this.delta.z
        return m4.lookAt(this.position, this.target, this.up)
    }

    // Make a view matrix from the camera matrix.
    // It is the matrix that moves everything the opposite of the camera, making everything relative
    // as if the camera was at (0,0,0). The inverse of cameraMatrix moves everything but the camera
    viewMatrix() {
        return m4.inverse(this.cameraMatrix())
    }

    // Compute the projection matrix
    projectionMatrix(gl) {
        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
        return m4.perspective(this.fieldOfView, aspect, 1, 200)
    }
}