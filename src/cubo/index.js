import {Scene,Color,PerspectiveCamera, WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh} from "three";
const scene = new Scene();
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight
);
const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({color: 0x00ff00, wireframe: true});
const cube = new Mesh(geometry, material);

scene.background = new Color(0x2a3b4c);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.add(cube);

camera.position.z = 7;

var animate = function(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();