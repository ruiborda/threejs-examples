import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {earth as tierra} from "./src/objects/earth";
import {markPosition} from "./src/objects/markPosition";
import starsTextureIMG from './stars.jpg'
const starsTexture =new THREE.TextureLoader().load(starsTextureIMG)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function onMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children);

    for ( let i = 0; i < intersects.length; i ++ ) {
        console.log(intersects[i].point)
        markPosition.position.x=intersects[i].point.x
        markPosition.position.y=intersects[i].point.y
        markPosition.position.z=intersects[i].point.z
    }

}
const scene = new THREE.Scene()
scene.background = starsTexture
//scene.fog = new THREE.Fog(0xfff, 0.1, 1000)
markPosition.position.z = 500
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

scene.add(tierra);
scene.add(markPosition)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1000;

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 560
controls.maxDistance = 1200
controls.listenToKeyEvents(window)
controls.screenSpacePanning=false
controls.enablePan=false
window.addEventListener('resize', () => {
    camera.aspect=window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
});
function render() {
    renderer.render( scene, camera );
}
window.addEventListener( 'auxclick', onMouseMove, false );
const animate = function () {
    window.requestAnimationFrame(animate)
    controls.update()
    render()
}
animate()