export class Camera {
    constructor(position, up, target, radius, fieldOfView, delta) {
        this.position = position
        this.up = up
        this.target = target
        this.radius = radius
        this.fieldOfView = fieldOfView
        this.cameraAngle = 180
        this.delta = delta.camera
    }

    zoom(offset){
        this.radius+=offset
    }

    // Compute the camera's matrix using look at.
    cameraMatrix(){
        this.position[0] = (Math.cos(this.cameraAngle) * this.radius) + this.delta.x
        this.position[1] = (Math.sin(this.cameraAngle) * this.radius) + this.delta.y
        // this.position[2] = (Math.sin(this.cameraAngle) * this.radius) + this.delta.z
        return m4.lookAt(this.position, this.target, this.up)
    }

    // Make a view matrix from the camera matrix.
    // It is the matrix that moves everything the opposite of the camera, making everything relative
    // as if the camera was at (0,0,0). The inverse of cameraMatrix moves everything but the camera
    viewMatrix(){
        return m4.inverse(this.cameraMatrix())
    }

    // Compute the projection matrix
    projectionMatrix(gl) {
        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
        return m4.perspective(this.fieldOfView, aspect, 1, 2000)
    }

    computeMatrix(viewProj, translation, rotX, rotY) {  // PRESA DA ENGINE
        let matrix = m4.translate(viewProj, translation[0], translation[1], translation[2])
        matrix = m4.xRotate(matrix, rotX)
        return m4.yRotate(matrix, rotY)
    }

    // Rotate the camera while looking at the target (changes the orientation of the camera)
    rotate(deg_angle){
        this.cameraAngle += degToRad(deg_angle)
    }
}

function degToRad(d) {
    return d * Math.PI / 180
}