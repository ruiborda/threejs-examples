import * as THREE from '../snowpack/pkg/three.js'
import {OrbitControls} from "../snowpack/pkg/three/examples/jsm/controls/OrbitControls.js"
import {earth as tierra} from "./src/objects/earth.js";
import {markPosition} from "./src/objects/markPosition.js";
import starsTextureIMG from './stars.jpg.proxy.js'

const starsTexture = new THREE.TextureLoader().load(starsTextureIMG)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const position = new THREE.Spherical();
//DOM
const setPosition = document.getElementById('setPosition')

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        markPosition.position.x = intersects[i].point.x
        markPosition.position.y = intersects[i].point.y
        markPosition.position.z = intersects[i].point.z
        let [lat, lng] = vector3ToLatLng(intersects[i].point)
        document.getElementById('lat').value = lat
        document.getElementById('lng').value = lng
    }
}

const scene = new THREE.Scene()
scene.background = starsTexture
//scene.fog = new THREE.Fog(0xfff, 0.1, 1000)
markPosition.position.z = 500
markPosition.position.x = 0
markPosition.position.y = 0
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
tierra.rotation.x = 0
tierra.rotation.y = -(Math.PI / 2)//igulaar la con la posicion de la rotacion
scene.add(tierra);
scene.add(markPosition)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1000;

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 560
controls.maxDistance = 1200
controls.listenToKeyEvents(window)
controls.screenSpacePanning = false
controls.enablePan = false
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
});

function render() {
    renderer.render(scene, camera);
}

window.addEventListener('auxclick', onMouseMove, false);
const animate = function () {
    window.requestAnimationFrame(animate)
    controls.update()
    render()
}
animate()

function latLngToVector3(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = Math.PI * (lon / 180);
    // theta = theta + (Math.PI / 2)//igulaar la con la posicion de la rotacion
    const spherical = new THREE.Spherical(radius, phi, theta);
    return new THREE.Vector3().setFromSpherical(spherical);
}

const vector3ToLatLng = (v3) => {
    const spherical = new THREE.Spherical().setFromVector3(v3);
    const lat = 180 * (0.5 - (spherical.phi / Math.PI));
    const lng = 180 * (spherical.theta / Math.PI);
    return [lat, lng]
};

function setMarkPositionFromLatLonRad(lat, lon, rad = 500) {
    const v3 = latLngToVector3(lat, lon, rad)
    markPosition.position.x = v3.x
    markPosition.position.y = v3.y
    markPosition.position.z = v3.z
}

setPosition.addEventListener('click', function () {
    setMarkPositionFromLatLonRad(document.getElementById('lat').value, document.getElementById('lng').value)
});