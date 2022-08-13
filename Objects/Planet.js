export class Planet{
    constructor(name, revolution, rotation, position, path) {
        this.name = name
        this.revolution = revolution
        this.rotation = rotation
        this.position = position
        this.filepath = path
        this.coords = this.get_coords(0)
        this.active = false
        this.center = false
    }

    get_coords(time){
        return this.position
    }
}