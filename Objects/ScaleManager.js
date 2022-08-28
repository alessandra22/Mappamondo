function scale_model(positions, ratio) {
    for (let i = 0; i < positions.length; i++)
        positions[i] /= ratio
}

export function getName(n) {
    switch (n) {
        case 0:
            return "realistic"
        case 1:
            return "less realistic"
        case 2:
            return "unrealistic"
    }
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
        else if (object.name === "Saturn's ring")
            scale_model(mesh.positions, 1.8)
        else
            scale_model(mesh.positions, object.ratio_sun * 0.1)
    }

    // add a scale for visible solar system model
    scale_visible(mesh, object) {
        if (object.name === "Sun")
            scale_model(mesh.positions, 0.6)
        else if (object.name === "Mercury")
            scale_model(mesh.positions, object.ratio_sun * 0.008)
        else if (object.name === "Pluto")
            scale_model(mesh.positions, object.ratio_sun * 0.002)
        else if (object.name === "Venus" || object.name === "Earth" || object.name === "Mars")
            scale_model(mesh.positions, object.ratio_sun * 0.01)
        else if (object.name === "Saturn's ring")
            scale_model(mesh.positions, object.ratio_sun * 0.15)
        else
            scale_model(mesh.positions, object.ratio_sun * 0.08)
    }

    scale_distances_realistic(object) {
        let fun = 0
        if (object.name !== "Sun")
            object.scale_position(10, fun)
    }

    scale_distances_realistic_visible(object) {
        let fun = 1
        if (object.name === "Sun")
            return
        if (object.name === "Mercury" || object.name === "Venus" || object.name === "Earth" || object.name === "Mars")
            object.scale_position(7, fun)
        else if (object.name === "Neptune" || object.name === "Uranus")
            object.scale_position(2, fun)
        else
            object.scale_position(3, fun)
    }

    scale_distances_visible(object) {
        if (object.name === "Sun")
            return
        object.normalize_position()
    }
}