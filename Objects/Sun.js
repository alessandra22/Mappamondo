export class Sun{
    constructor(path) {
        this.name = "Sun"
        this.revolution = {x:0, y:0, z:0}   // the sun spins!
        this.rotation = {x:0, y:0, z:0}
        this.position = {x:0, y:0, z:0}
        this.coords = this.position
        this.filepath = path
        this.active = false
        this.center = true
        this.photo = false
    }
}