import {Renderer} from "./Renderer.js";

function scale_model(positions, ratio){
    for(let i=0; i<positions.length; i++)
        positions[i] /= ratio
}

export class MeshLoader {
    constructor(list) {
        this.list = list;   // contains an object list which will be updated by load function also in caller classes
    }

    load(gl, object) {
        let mesh = []                          // create an object with a list (empty in the beginning)
        mesh.sourceMesh = object.filepath      // that will be filled by infos in file defined in sourceMesh field
        LoadMesh(gl, mesh)                     // function defined in load_mesh.js file that updates the list

        this.scale_visible(mesh, object)
        // add a scale for visible solar system model

        this.list.push(new Renderer(mesh, object))   // list is passed to a Renderer object, defined in Renderer.js
    }


    // add a scale for more realistic solar system model
    scale_realistic(mesh, object){
        switch(object.name){
            case "Mercury": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Venus": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Earth": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Mars": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Jupiter": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Saturn": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Uranus": {scale_model(mesh.positions, object.ratio_sun); break}
            case "Neptune": {scale_model(mesh.positions, object.ratio_sun); break}
        }
    }

    // add a scale for more realistic and visible solar system model
    scale_realistic_visible(mesh, object){
        switch(object.name){
            case "Sun": {scale_model(mesh.positions, 0.6); break}
            case "Mercury": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Venus": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Earth": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Mars": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Jupiter": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Saturn": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Uranus": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Neptune": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
        }
    }

    // add a scale for visible solar system model
    scale_visible(mesh, object){
        switch(object.name){
            case "Sun": {scale_model(mesh.positions, 0.6); break}
            case "Mercury": {scale_model(mesh.positions, object.ratio_sun*0.005); break}
            case "Venus": {scale_model(mesh.positions, object.ratio_sun*0.01); break}
            case "Earth": {scale_model(mesh.positions, object.ratio_sun*0.01); break}
            case "Mars": {scale_model(mesh.positions, object.ratio_sun*0.01); break}
            case "Jupiter": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Saturn": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Uranus": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
            case "Neptune": {scale_model(mesh.positions, object.ratio_sun*0.1); break}
        }
    }
}