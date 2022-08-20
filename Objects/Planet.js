export class Planet{
    constructor(name, revolution, rotation, position, path, ratio_sun) {
        this.name = name
        this.revolution = revolution
        this.rotation = rotation
        this.position = position
        this.filepath = path
        this.coords = this.get_coords(0)
        this.active = false
        this.center = false
        this.ratio_sun = ratio_sun
    }

    get_coords(time){
        return this.position
    }
}