import {Planet} from "./Planet.js";
import {Sun} from "./Sun.js";

/*
The solar system is the gravitationally bound system of the Sun and the objects that orbit it.
As the vast majority of the system's mass is in the Sun (99.86%), proportions between objects are not properly respected.

The four inner planets (Mercury, Venus, Earth and Mars) are terrestrial planets.
The other four are said giant planets: the two largest (Jupiter and Saturn) are gas giants, the next two (Uranus and
Neptune), are ice giants. Sadly, since 2006, Pluto is no more considered a planet.

All the satellites are not included, as the Earth has only one moon, but only Jupiter has 79.
 */

export class SolarSystem{
    constructor() {
        this.planets = [
            new Planet(1, "Mercury",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Mercury.obj", 277, 0.38),
            new Planet(2, "Venus",{x:0, y:0, z:0}, {x:1, y:1, z:1},"Models/Venus.obj", 113, 0.72),
            new Planet(3, "Earth",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Earth.obj", 108, 1),
            new Planet(4, "Mars",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Mars.obj", 208, 1.5),
            new Planet(5, "Jupiter",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Jupiter.obj", 9.7, 5.2),
            new Planet(6, "Saturn",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Saturn.obj", 11.4, 9.5),
            new Planet(7, "Uranus",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Uranus.obj", 26.8, 19.2),
            new Planet(8, "Neptune",{x:0, y:0, z:0}, {x:0, y:0, z:0},"Models/Neptune.obj", 27.7, 30.1),
        ]
        this.sun = new Sun("Models/Sun.obj")
        this.objects = []

        this.objects.push(this.sun)
        for(let i=0; i<this.planets.length; i++)
            this.objects.push(this.planets[i])
    }
}
