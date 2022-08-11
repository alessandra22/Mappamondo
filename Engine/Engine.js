import {MeshLoader} from "./MeshLoader.js";
import {setControls} from "./Controls.js";

let mesh_list = [];
let gl;
let scene_curr;
let i=0
let delta

export class Engine {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.delta = {x:0, y:0, z:0}
        setControls(this.canvas, this.delta)
        delta = this.delta
        this.gl = this.canvas.getContext("webgl");
        if (!this.gl) {
            alert("This browser does not support opengl acceleration.")
            return;
        }
        this.mesh_list = [];
        this.scene = null;

        this.mesh_loader = new MeshLoader(this.mesh_list)

        mesh_list = this.mesh_list;
        gl = this.gl
    }

    load_scene(scene) {
        this.scene = scene;
        scene_curr = scene;
        for (const obj of scene.objects) {
            console.debug(obj)
            this.mesh_loader.load(obj.path, this.gl, obj.player, obj.active, obj.coords, obj.alias)
        }
        mesh_list = this.mesh_list;
    }
}



let curr_time = 0;

export function render(time = 0) {
    let program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"])
    gl.useProgram(program);

    mesh_list.forEach(elem => {
        //elem.render(gl, {ambientLight: [0.2, 0.2, 0.2], colorLight: [1.0, 1.0, 1.0]}, program, find_actor_coords(), delta);
        elem.render(gl, {ambientLight: [0.2, 0.2, 0.2], colorLight: [1.0, 1.0, 1.0]}, program, [0,0,0], delta)
    })

    delta.x = 0
    delta.y = 0
    delta.z = 0

    function degToRad(d) {
        return d * Math.PI / 180;
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