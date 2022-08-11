import {MeshLoader} from "./MeshLoader.js";
import {setControls} from "./Controls.js";

let mesh_list = []
let gl
let scene_curr
let curr_time = 0
let delta = {x:0, y:0, z:0} // vector where requests from user behavior will be saved

function delta_reset(){
    delta.x = 0     // reset of delta vector
    delta.y = 0
    delta.z = 0
}

export class Engine {
    constructor(id) {
        this.canvas = document.getElementById(id)   // get canvas object
        setControls(this.canvas, delta)             // assign events to canvas (defined in Controls.js)
        this.gl = this.canvas.getContext("webgl")   // get webgl version ???
        if (!this.gl) {
            alert("This browser does not support opengl acceleration.")
            return
        }
        this.scene = null   // strumentopolo misterioso che ci servirà più tardi?
        this.mesh_loader = new MeshLoader(mesh_list)    // oggetto MeshLoader (da MeshLoader.js)
        gl = this.gl
    }

    load_scene(scene) {
        this.scene = scene  // scene is loaded in the object
        scene_curr = scene  // and globally, as current scene
        for (const obj of scene.objects) {  // for every object in the scene
            console.debug(obj)
            this.mesh_loader.load(  // mesh is loaded as defined in MeshLoader.js, for a Renderer object
                obj.path,
                this.gl,
                obj.player,
                obj.active,
                obj.coords,
                obj.alias
            )
        } // after the for cycle, mesh_loader.list is now updated with all objects mesh
    }
}

export function render(time = 0) {
    let program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"])
    gl.useProgram(program)

    mesh_list.forEach(elem => {
        //elem.render(gl, {ambientLight: [0.2, 0.2, 0.2], colorLight: [1.0, 1.0, 1.0]}, program, find_actor_coords(), delta)
        elem.render(gl, {ambientLight: [0.2, 0.2, 0.2], colorLight: [1.0, 1.0, 1.0]}, program, [0,0,0], delta)
        delta_reset() // inside the cycle, it only moves the first object
    })

    // outside the cycle, delta_reset would move all the object

    function degToRad(d) {
        return d * Math.PI / 180
    }

    function computeMatrix(viewProj, translation, rotX, rotY) {
        let matrix = m4.translate(viewProj, translation[0], translation[1], translation[2])
        matrix = m4.xRotate(matrix, rotX)
        return m4.yRotate(matrix, rotY)
    }

    requestAnimationFrame(render)
}

function find_actor_coords() {
    let actor = null;
    for (let i = 0; i < mesh_list.length; i++) {
        if (mesh_list[i].isPlayer) {
            actor = mesh_list[i]
            break;
        }
    }

    if(actor != null)
        return [actor.mesh.positions[0], actor.mesh.positions[1], actor.mesh.positions[2]]
    else
        throw new Error("No player objects in project")
}