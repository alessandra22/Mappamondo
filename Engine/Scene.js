// add here objects to render
let objects = [
    {
        alias: "Mappamondo",
        path: "Models/Mappamondo.obj",
        player: true,
        active: true,
        coords: {
            "x": 0,
            "y": 0,
            "z": 0
        }
    }/*,
    {
        alias: "Mappamondo2",
        path: "Models/Mappamondo.obj",
        player: true,
        active: true,
        coords: {
            "x": 5,
            "y": 0,
            "z": 1
        }
    }*/
]

export class Scene {
    constructor(name) {
        this.name = name
        this.objects = objects
        console.debug(this.objects)
    }
}