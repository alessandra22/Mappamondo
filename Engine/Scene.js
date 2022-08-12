// add here objects to render
let objects = [
    {
        alias: "Terra",
        path: "Models/Terra.obj",
        player: true,
        active: false,
        coords: {
            "x": 0,
            "y": 0,
            "z": 0
        }
    },
    {
        alias: "Marte",
        path: "Models/Marte.obj",
        player: false,
        active: false,
        coords: {
            "x": 5,
            "y": 0,
            "z": 1
        }
    }
]

export class Scene {
    constructor(name) {
        this.name = name
        this.objects = objects
    }
}