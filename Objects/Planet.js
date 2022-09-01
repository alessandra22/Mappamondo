export class Planet {
    constructor(number, name, revolution, rotation, path, ratio_sun, sun_distance, ring) {
        this.number = number
        this.name = name
        this.revolution = revolution
        this.rotation = rotation
        this.position = {x: sun_distance, y: 0, z: 0}
        this.filepath = path
        this.center = false
        this.ratio_sun = ratio_sun
        this.sun_distance = sun_distance
        this.ring = null
        if(ring)
            this.setRing(ring)
    }

    normalize_position() {
        this.position.x = this.number * 3
        if(this.ring) {
            this.ring.position.x = this.number * 3 + 0.8
        }
    }

    scale_position(scale, fun) {
        let offset = 0
        switch (fun) {
            case 0: offset = 0.2; break
            case 1: offset = 0.5
        }
        this.position = {x: this.sun_distance * scale, y: 0, z: 0}
        if(this.ring)
            this.ring.position = {x: this.position.x + offset, y: 0, z: 0}
        console.log(offset)
    }

    get_coords(start, center, time) {
        let alpha = (time * 2 * Math.PI) / this.rotation
        return rotate(start, center, alpha)
    }

    setRing(ring){
        this.ring = ring
        ring.name = this.name + "'s ring"
        ring.planet = this
        ring.ratio_sun = this.ratio_sun
        ring.position = {x: this.position.x, y: this.position.y, z: this.position.z}
    }

}

export function rotate(start, center, alpha) {
    let yc = center.y
    let sin = Math.sin(alpha)
    let cos = Math.cos(alpha)
    return {
        x: cos * start.x + sin * start.z * yc,
        y: (yc*yc + (1 - (yc*yc)) * cos) * start.y,
        z: -sin * start.x * yc + cos * start.z
    }
}