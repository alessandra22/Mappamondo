import {Renderer} from "./Renderer.js";
import {ScaleManager} from "../Objects/ScaleManager.js";

let sm = new ScaleManager()

export class MeshLoader {
    constructor(list, scale, distances) {
        this.list = list;   // contains an object list which will be updated by load function also in caller classes
        this.scale = scale
        this.distances = distances
    }

    resetList(){
        this.list = []
    }

    load(gl, object) {
        let mesh = []                          // create an object with a list (empty in the beginning)
        mesh.sourceMesh = object.filepath      // that will be filled by infos in file defined in sourceMesh field
        if(object.name === "Sun")
            LoadMesh(gl, mesh, object.photo, "Cosenza.png")   // function defined in load_mesh.js file that updates the list
        else
            LoadMesh(gl, mesh, false)

        // decide the scale of the objects on the scene
        switch(this.scale){
            case 0: sm.scale_realistic(mesh, object);         break
            case 1: sm.scale_realistic_visible(mesh, object); break
            case 2: sm.scale_visible(mesh, object)
        }

        // decide the scale of the distances between planets on the scene
        switch(this.distances){
            case 0: sm.scale_distances_realistic(object);         break
            case 1: sm.scale_distances_realistic_visible(object); break
            case 2: sm.scale_distances_visible(object)
        }

        this.list.push(new Renderer(mesh, object))   // list is passed to a Renderer object, defined in Renderer.js

        console.log("Mesh for", object.name, "loaded")
    }

}