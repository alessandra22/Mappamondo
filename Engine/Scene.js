// add here objects to render
import {Planet} from "../Objects/Planet.js";
import {Sun} from "../Objects/Sun.js";

let planets = [
    new Planet("Terra",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:4, y:0, z:0},"Models/Terra.obj"),
    new Planet("Marte",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:9, y:0, z:1},"Models/Marte.obj"),
]
let sun = new Sun("Models/Sole.obj")

let objects = []

objects.push(sun)
for(let i=0; i<planets.length; i++)
    objects.push(planets[i])

export class Scene {
    constructor(name) {
        this.name = name
        this.objects = objects
    }
}