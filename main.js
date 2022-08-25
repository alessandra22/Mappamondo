import {Scene} from "./Engine/Scene.js"
import {Engine, render} from "./Engine/Engine.js"
import {SolarSystem} from "./Objects/Solarsystem.js";

let solarSystem = new SolarSystem()
let scene = new Scene("test", solarSystem.objects)   // create a Scene object (Scene.js) named "test"
let en = new Engine("screen", 2, 1)     // create an Engine object (Engine.js) named "screen"
en.load_scene(scene)    // uses the engine for load the scene objects
render()    // render the scene (function in Engine.js)