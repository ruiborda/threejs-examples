import {
    Scene,
    Color,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Fog,
    TextureLoader,
    PlaneGeometry,
    AxisHelper
} from "three";
import {cube} from "./objects/cubo";
import {plane} from "./objects/plane";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {sphere} from "./objects/sphere";

const axis = new AxisHelper()
const scene = new Scene();
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);
const loader = new TextureLoader()

scene.add(plane)
scene.add(axis)
scene.add(sphere)
//scene.fog = new Fog(0x76456c, 0, 10);
scene.background = new Color("skyblue");

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


scene.add(cube);

camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
camera.lookAt(scene.position)
const controls = new OrbitControls(camera, renderer.domElement)
let i = 0;
let animate = function () {
    window.requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    i += 0.04
    sphere.position.z = -4 + Math.cos(i)
    sphere.position.y = 1 + Math.abs(Math.sin(i))

    renderer.render(scene, camera);

}

animate();