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
        if(this.ring)
            this.ring.position.x = this.number * 3 + 0.7
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
        ring.position = this.position
        ring.ratio_sun = this.ratio_sun
    }

}

export function rotate(start, center, alpha) {
    return {
        x: start.x * Math.cos(alpha) + start.z * Math.sin(alpha),
        y: start.y,
        z: -start.x * Math.sin(alpha) + start.z * Math.cos(alpha)
    }
}