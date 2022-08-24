export class Planet {
    constructor(number, name, revolution, rotation, path, ratio_sun, sun_distance) {
        this.number = number
        this.name = name
        this.revolution = revolution
        this.rotation = rotation
        this.position = {x: sun_distance, y: 0, z: 0}
        this.filepath = path
        this.active = false
        this.center = false
        this.ratio_sun = ratio_sun
        this.sun_distance = sun_distance
    }

    normalize_position() {
        this.position.x = this.number * 3
    }

    scale_position(scale) {
        this.position = {x: this.sun_distance * scale, y: 0, z: 0}
    }

    get_coords(start, center, time) {
        let alpha = (time * 2 * Math.PI) / this.rotation
        return rotate(start, center, alpha)
    }

}

function rotate(start, center, alpha) {
    return {
        x: start.x * Math.cos(alpha) + start.z * Math.sin(alpha),
        y: start.y,
        z: -start.x * Math.sin(alpha) + start.z * Math.cos(alpha)
    }
}