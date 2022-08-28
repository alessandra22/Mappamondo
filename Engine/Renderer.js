import {canvas_objects, gl, curr_time, time_changed, curr_scale, curr_distances} from "./Engine.js"
import {getName} from "../Objects/ScaleManager.js";

export class Renderer {
    constructor(mesh, object) {     // offsets is the starting position of the object
        this.mesh = mesh        // mesh that need to be rendered
        this.object = object
        this.start = this.compute_start_position().slice()   // mesh updated by starting positions and saving them
        window.addEventListener('resize', this.resize, false)
    }

    compute_start_position() {   // mesh positions are now updated with start positions defined in Scene.js
        for (let i = 0; i < this.mesh.positions.length; i += 3) {
            this.mesh.positions[i] += parseFloat(this.object.position.z)
            this.mesh.positions[i + 1] += parseFloat(this.object.position.x)
            this.mesh.positions[i + 2] += parseFloat(this.object.position.y)
        }
        get_center(this.mesh.positions)
        return this.mesh.positions
    }

    compute_new_position(time) { // mesh positions are now updated with the movement defined by rotation
        if(time===0) {
            this.mesh.positions = this.start.slice()
            return
        }
        for (let i = 0; i < this.mesh.positions.length; i += 3) {
            let coords = this.object.get_coords(
                {x: this.start[i+1], y: this.start[i+2], z: this.start[i]},
                {x: 0, y: 0, z: 0},
                time)
            this.mesh.positions[i] = coords.z
            this.mesh.positions[i+1] = coords.x
            this.mesh.positions[i+2] = coords.y
        }
        get_center(this.mesh.positions)
    }

    resize(){
        canvas_objects.width = window.innerWidth - 50    // make the canvas full-screen width and height
        canvas_objects.height = window.innerHeight - 150 // even when the browser is resized
    }

    write(){
        let canvas_text = document.getElementById("text")
        let ctx = canvas_text.getContext("2d")
        ctx.clearRect(0, 0, canvas_text.width, canvas_text.height)
        let start_altezza = 30
        ctx.font = "18pt Nasa"
        ctx.fillStyle = "white"
        ctx.fillText("Day: " + curr_time, canvas_objects.width/100, start_altezza)
        ctx.font = "10pt Nasa"
        ctx.fillText("scale: " + getName(curr_scale), canvas_objects.width/100,start_altezza+30)
        ctx.fillText("distances: " + getName(curr_distances), canvas_objects.width/100,start_altezza+60)
        ctx.fillText("Earth years: " + Math.floor(curr_time/365), canvas_objects.width/100,start_altezza+110)
        ctx.fillText("Jupiter years: " + Math.floor(curr_time/4329), canvas_objects.width/100,start_altezza+140)
    }

    render(light, program, camera) {
        this.resize()
        this.write()
        if(time_changed && this.object.name !== "Sun")
            this.compute_new_position(curr_time)

        let positionLocation = gl.getAttribLocation(program, "a_position")
        let normalLocation = gl.getAttribLocation(program, "a_normal")
        let texcoordLocation = gl.getAttribLocation(program, "a_texcoord")
        this.positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.positions), gl.STATIC_DRAW)
        this.normalsBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.normals), gl.STATIC_DRAW)
        this.texcoordBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.texcoords), gl.STATIC_DRAW)
        gl.uniform3fv(gl.getUniformLocation(program, "diffuse"), this.mesh.diffuse)
        gl.uniform3fv(gl.getUniformLocation(program, "ambient"), this.mesh.ambient)
        gl.uniform3fv(gl.getUniformLocation(program, "specular"), this.mesh.specular)
        gl.uniform3fv(gl.getUniformLocation(program, "emissive"), this.mesh.emissive)
        gl.uniform3fv(gl.getUniformLocation(program, "u_ambientLight"), light.ambientLight)
        gl.uniform3fv(gl.getUniformLocation(program, "u_colorLight"), light.colorLight)

        gl.uniform1f(gl.getUniformLocation(program, "shininess"), this.mesh.shininess)
        gl.uniform1f(gl.getUniformLocation(program, "opacity"), this.mesh.opacity)
        gl.enableVertexAttribArray(positionLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        const size = 3          // 3 components per iteration
        const type = gl.FLOAT   // the data is 32bit floats
        const normalize = false // don't normalize the data
        const stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset)
        gl.enableVertexAttribArray(normalLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer)
        gl.vertexAttribPointer(normalLocation, size, type, normalize, stride, offset)
        gl.enableVertexAttribArray(texcoordLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer)
        gl.vertexAttribPointer(texcoordLocation, size - 1, type, normalize, stride, offset)

        let matrixLocation = gl.getUniformLocation(program, "u_world")
        let textureLocation = gl.getUniformLocation(program, "diffuseMap")
        let viewMatrixLocation = gl.getUniformLocation(program, "u_view")
        let projectionMatrixLocation = gl.getUniformLocation(program, "u_projection")
        let lightWorldDirectionLocation = gl.getUniformLocation(program, "u_lightDirection")
        let viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition")

        gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix())
        gl.uniformMatrix4fv(projectionMatrixLocation, false, camera.projectionMatrix(gl))

        // set the light position
        gl.uniform3fv(lightWorldDirectionLocation, m4.normalize([-1, 3, 5]))

        // set the camera/view position
        gl.uniform3fv(viewWorldPositionLocation, camera.position)

        // Tell the shader to use texture unit 0 for diffuseMap
        gl.uniform1i(textureLocation, 0)

        let vertNumber = this.mesh.numVertices

        gl.bindTexture(gl.TEXTURE_2D, this.mesh.texture)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.enable(gl.DEPTH_TEST)

        let matrix = m4.identity()
        //let matrix = this.computeMatrix(m4.identity(), [0,0,0], degToRad(0), degToRad(0))

        gl.uniformMatrix4fv(matrixLocation,false, matrix)
        gl.drawArrays(gl.TRIANGLES, 0, vertNumber)
    }
}

function get_center(positions){
    let min = {x: positions[1], y: positions[2], z: positions[0]}
    let max = {x: positions[1], y: positions[2], z: positions[0]}

    for(let i=3; i<positions.length; i+=3){
        if(min.z > positions[i])
            min.z = positions[i]
        if(max.z < positions[i])
            max.z = positions[i]

        if(min.x > positions[i+1])
            min.x = positions[i+1]
        if(max.x < positions[i+1])
            max.x = positions[i+1]

        if(min.y > positions[i+2])
            min.y = positions[i+2]
        if(max.y < positions[i+2])
            max.y = positions[i+2]
    }

    console.log(positions)
    let center = {x: (min.x+max.x)/2, y: (min.y+max.y)/2, z: (min.z+max.z)/2}
    console.log(center)
}