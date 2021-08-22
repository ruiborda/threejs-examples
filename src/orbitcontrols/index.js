import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import surface_texture from './earth_surface.jpg'

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
        alert(`x:${intersects[i].point.x} y:${intersects[i].point.y} z:${intersects[i].point.z}`)
    }
}
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000)
scene.fog = new THREE.Fog(0x000, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.SphereGeometry(500, 64, 64);
const material = new THREE.MeshBasicMaterial({
    color: 0xfffff,
    map: THREE.ImageUtils.loadTexture(surface_texture),
    transparent: false
})

const earth = new THREE.Mesh(geometry, material)
scene.add(earth);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1000;

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 560
controls.maxDistance = 1200
controls.listenToKeyEvents(window)
controls.screenSpacePanning=false
window.addEventListener('resize', () => {
    camera.aspect=window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
});
function render() {

    // update the picking ray with the camera and mouse position
   /* raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children);

    for ( let i = 0; i < intersects.length; i ++ ) {
        console.log(intersects[i].point)
    }*/

    renderer.render( scene, camera );

}
window.addEventListener( 'auxclick', onMouseMove, false );
const animate = function () {
    window.requestAnimationFrame(animate)
    controls.update()
    render()
}
animate()