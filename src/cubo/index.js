import {
    Scene,
    Color,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Fog,
    TextureLoader
} from "three";
import fondourl from './fondo.jpg'

const scene = new Scene();
scene.background = new Color("skyblue");
scene.fog = new Fog(0x76456c, 0, 8);
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);
const loader = new TextureLoader()
loader.load(fondourl, function (texture) {
    scene.background=texture
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({color: 0x00ff00});
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

var animate = function () {
    window.requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();