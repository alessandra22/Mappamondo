import {Renderer} from "./Renderer.js";
import {ScaleManager} from "../Objects/ScaleManager.js";

let sm = new ScaleManager()

export class MeshLoader {
    constructor(list, scale, distances) {
        this.list = list;   // contains an object list which will be updated by load function also in caller classes
        this.scale = scale
        this.distances = distances
    }

    load(gl, object) {
        let mesh = []                          // create an object with a list (empty in the beginning)
        mesh.sourceMesh = object.filepath      // that will be filled by infos in file defined in sourceMesh field
        LoadMesh(gl, mesh)
        let rawMesh = mesh.positions.slice()
        scaleObjects(mesh.positions, object, this.scale, this.distances)

        this.list.push(new Renderer(mesh, object, rawMesh))   // list is passed to a Renderer object, defined in Renderer.js

        console.log("Mesh for", object.name, "loaded")
    }
}

export function scaleObjects(positions, object, scale, distances) {

    chooseScale(scale, positions, object)
    chooseDistances(distances, object)

}

export function chooseScale(scale, positions, object){
    // decide the scale of the objects on the scene
    switch (scale) {
        case 0:
            sm.scale_realistic(positions, object);
            break
        case 1:
            sm.scale_realistic_visible(positions, object);
            break
        case 2:
            sm.scale_visible(positions, object)
    }
}

export function chooseDistances(distances, object){
    // decide the scale of the distances between planets on the scene
    switch (distances) {
        case 0:
            sm.scale_distances_realistic(object);
            break
        case 1:
            sm.scale_distances_realistic_visible(object);
            break
        case 2:
            sm.scale_distances_visible(object)
    }
}