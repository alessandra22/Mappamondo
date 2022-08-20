function scale_model(positions, ratio){
    for(let i=0; i<positions.length; i++)
        positions[i] /= ratio
}

export class ScaleManager {

    // add a scale for more realistic solar system model
    scale_realistic(mesh, object) {
        scale_model(mesh.positions, object.ratio_sun)
    }

    // add a scale for more realistic and visible solar system model
    scale_realistic_visible(mesh, object) {
        if (object.name === "Sun")
            scale_model(mesh.positions, 0.6);
        else
            scale_model(mesh.positions, object.ratio_sun * 0.1)
    }

    // add a scale for visible solar system model
    scale_visible(mesh, object) {
        if (object.name === "Sun")
            scale_model(mesh.positions, 0.6)
        else if (object.name === "Mercury")
            scale_model(mesh.positions, object.ratio_sun * 0.008)
        else if (object.name === "Venus" || object.name === "Earth" || object.name === "Mars")
            scale_model(mesh.positions, object.ratio_sun * 0.01)
        else
            scale_model(mesh.positions, object.ratio_sun * 0.08)
    }

    scale_distances_realistic(object) {
        if (object.name !== "Sun")
            object.scale_position(10)
    }

    scale_distances_realistic_visible(object) {
        if (object.name === "Sun")
            return
        if (object.name === "Mercury" || object.name === "Venus" || object.name === "Earth" || object.name === "Mars")
            object.scale_position(7)
        else if (object.name === "Uranus" || object.name === "Neptune")
            object.scale_position(2)
        else
            object.scale_position(3)
    }

    scale_distances_visible(object) {
        if (object.name === "Sun")
            return
        object.normalize_position()
    }
}