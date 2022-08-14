import {Renderer} from "./Renderer.js";

export class MeshLoader {
    constructor(list) {
        this.list = list;   // contains an object list which will be updated by load function also in caller classes
    }

    load(gl, object) {
        let mesh = []                   // create an object with a list (empty in the beginning)
        mesh.sourceMesh = object.filepath      // that will be filled by infos in file defined in sourceMesh field
        LoadMesh(gl, mesh)              // function defined in load_mesh.js file that updates the list
        this.list.push(new Renderer(mesh, object))   // list is passed to a Renderer object
    }                                                                      // (defined in Renderer.js)
}