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
            new Planet("Mercury",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:3, y:0, z:0},"Models/Mercury.obj", 277),
            new Planet("Venus",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:6, y:0, z:0},"Models/Venus.obj", 113),
            new Planet("Earth",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:9, y:0, z:0},"Models/Earth.obj", 108),
            new Planet("Mars",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:12, y:0, z:0},"Models/Mars.obj", 208),
            new Planet("Jupiter",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:15, y:0, z:0},"Models/Jupiter.obj", 9.7),
            new Planet("Saturn",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:18, y:0, z:0},"Models/Saturn.obj", 11.4),
            new Planet("Uranus",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:21, y:0, z:0},"Models/Uranus.obj", 26.8),
            new Planet("Neptune",{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:24, y:0, z:0},"Models/Neptune.obj", 27.7),
        ]
        this.sun = new Sun("Models/Sun.obj")
        this.objects = []

        this.objects.push(this.sun)
        for(let i=0; i<this.planets.length; i++)
            this.objects.push(this.planets[i])
    }
}
