import {Scene} from "./Engine/Scene.js"
import {Engine, render} from "./Engine/Engine.js"

let scene = new Scene("test")   // create a Scene object (Scene.js) named "test"
let en = new Engine("screen")     // create an Engine object (Engine.js) named "screen"
en.load_scene(scene)    // uses the engine for load the scene objects
console.log(en)
render()    // render the scene (function in Engine.js)