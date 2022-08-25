import {MeshLoader} from "./MeshLoader.js";
import {Camera} from "./Camera.js";
import {setControls} from "./Controls.js";

let render_list = []
export let gl, canvas_objects
let scene_curr
export let curr_time = 0, old_time = 0, curr_auto = false, time_changed = false
let offset = 0, updateOffset = false

let camera = new Camera([9,-4,4], [0,0,1], [0,0,0],20,70)

export function setTime(t){
    curr_time = t
    time_changed = true
}

export function setAuto(auto){
    curr_auto = auto
}

function updateTime(time, program){
    if(curr_auto){
        let t_sec = Math.floor(time/1000)
        if(!updateOffset) {
            offset = t_sec
            updateOffset = true
        }

        if(curr_time !== old_time + t_sec - offset) {
            curr_time = old_time + t_sec - offset
            time_changed = true
        }
    } else {
        updateOffset = false
        old_time = curr_time
    }

    // call Renderer/render for every element
    render_list.forEach(elem => {
        elem.render({ambientLight: [0.2, 0.2, 0.2], colorLight: [1.0, 1.0, 1.0]}, program, camera)
    })

    time_changed = false
}

export class Engine {
    constructor(id) {
        canvas_objects = document.getElementById(id)   // get canvas object
        setControls(canvas_objects, camera)     // assign events to canvas (defined in Controls.js)
        gl = canvas_objects.getContext("webgl")   // get webgl version ???
        if (!gl) {
            alert("This browser does not support opengl acceleration.")
            return
        }
        this.scene = null   // strumentopolo misterioso che ci servirà più tardi?
        this.mesh_loader = new MeshLoader(render_list, 2, 2)    // oggetto MeshLoader (da MeshLoader.js)
    }

    load_scene(scene) {
        this.scene = scene  // scene is loaded in the object
        scene_curr = scene  // and globally, as current scene
        for (const obj of scene.objects) {  // for every object in the scene
            this.mesh_loader.load(gl, obj)// mesh is loaded as defined in MeshLoader.js, for a Renderer object
        } // after the for cycle, mesh_loader.list (= render_list) is now updated with all objects mesh
    }
}

export function render(time=0) {
    let program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"])
    gl.useProgram(program)
    updateTime(time, program)
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