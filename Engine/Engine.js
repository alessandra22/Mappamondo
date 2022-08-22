import {MeshLoader} from "./MeshLoader.js";
import {Camera} from "./Camera.js";
import {setControls} from "./Controls.js";

let render_list = []
export let gl, canvas
let scene_curr
let curr_time = 0
let delta = { // vectors where requests from user behavior will be saved
    camera: {x: 0, y: 0, z: 0},
    objects: {x: 0, y: 0, z: 0}
}
let camera = new Camera([9,-4,4], [0,0,1], [0,0,0],20,70, delta)

function delta_reset(){
    delta.camera.x = 0; delta.camera.y = 0; delta.camera.z = 0
    delta.objects.x = 0; delta.objects.y = 0; delta.objects.z = 0
}

export class Engine {
    constructor(id) {
        canvas = document.getElementById(id)   // get canvas object
        setControls(canvas, delta, camera)     // assign events to canvas (defined in Controls.js)
        gl = canvas.getContext("webgl")   // get webgl version ???
        if (!gl) {
            alert("This browser does not support opengl acceleration.")
            return
        }
        this.scene = null   // strumentopolo misterioso che ci servirà più tardi?
        this.mesh_loader = new MeshLoader(render_list, 2, 1)    // oggetto MeshLoader (da MeshLoader.js)
    }

    load_scene(scene) {
        this.scene = scene  // scene is loaded in the object
        scene_curr = scene  // and globally, as current scene
        for (const obj of scene.objects) {  // for every object in the scene
            this.mesh_loader.load(gl, obj)// mesh is loaded as defined in MeshLoader.js, for a Renderer object
        } // after the for cycle, mesh_loader.list (= render_list) is now updated with all objects mesh
    }
}

export function render(time = 0) {
    let program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"])
    gl.useProgram(program)

    // call Renderer/render for every element
    render_list.forEach(elem => {
        elem.render({ambientLight: [0.2, 0.2, 0.2], colorLight: [1.0, 1.0, 1.0]}, program, camera, delta)
    })
    delta_reset()   // inside the cycle, it only moves the first object in render_list (first defined in Solarsystem.js)
                    // outside the cycle, it moves all the object

    requestAnimationFrame(render)
}

function find_actor_coords() {
    let actor = null;
    for (let i = 0; i < render_list.length; i++) {
        if (render_list[i].center) {
            actor = render_list[i]
            return [actor.mesh.positions[0], actor.mesh.positions[1], actor.mesh.positions[2]]
        }
    }
    throw new Error("No center object in project")
}