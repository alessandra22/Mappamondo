import {Renderer} from "./Renderer.js";

export class MeshLoader {
    constructor(list) {
        this.list = list;
    }

    load(filepath, gl, isPlayer, isActive, coords, alias) {
        let mesh = []
        mesh.sourceMesh = filepath
        LoadMesh(gl, mesh)
        this.list.push(new Renderer(mesh, alias, isActive, isPlayer, coords))
    }
}