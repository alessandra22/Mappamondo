import {rotate} from "./Planet.js"

export class Ring {
    constructor(path) {
        this.planet = null
        this.filepath = path
    }

    normalize_position() {
        return null
    }

    scale_position(scale) {
        return null
    }

    get_coords(start, center, time) {
        let alpha = (time * 2 * Math.PI) / this.planet.rotation
        return rotate(start, center, alpha)
    }

}