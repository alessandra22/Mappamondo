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

    normalize_position(){
        this.position.x = this.number * 3
    }

    scale_position(scale) {
        this.position = {x: this.sun_distance * scale, y: 0, z: 0}
    }

    get_coords(time) {
        let new_position = {x:0, y:0, z:0}
        new_position.x += time*this.rotation.x
        new_position.y += time*this.rotation.y
        new_position.z += time*this.rotation.z

        return new_position
    }
}