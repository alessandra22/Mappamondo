import {Planet} from "./Planet.js";
import {Sun} from "./Sun.js";

export class SolarSystem{
    constructor() {
        this.planets = [
            new Planet("Terra",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:4, y:0, z:0},"Models/Terra.obj"),
            new Planet("Marte",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:9, y:0, z:1},"Models/Marte.obj"),
        ]
        this.sun = new Sun("Models/Sole.obj")
        this.objects = []

        this.objects.push(this.sun)
        for(let i=0; i<this.planets.length; i++)
            this.objects.push(this.planets[i])
    }
}
