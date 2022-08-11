import {Scene} from "./Engine/Scene.js";
import {Engine, render} from "./Engine/Engine.js";

console.debug("Main: starting")
let scene = new Scene("test");
let en = new Engine("screen");
en.load_scene(scene)
render()