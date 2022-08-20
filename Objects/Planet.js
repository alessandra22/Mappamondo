export class Planet {
    constructor(number, name, revolution, rotation, path, ratio_sun, sun_distance) {
        this.number = number
        this.name = name
        this.revolution = revolution
        this.rotation = rotation
        this.position = {x: sun_distance, y: 0, z: 0}
        this.filepath = path
        this.coords = this.get_coords(0)
        this.active = false
        this.center = false
        this.ratio_sun = ratio_sun
        this.sun_distance = sun_distance
    }

    normalize_position(){
        this.position.x = this.number * 3
    }

    scale_position(scale) {
        this.position = {x: this.sun_distance * scale, y: 0, z: 0}
    }

    get_coords(time) {
        return this.position
    }
}