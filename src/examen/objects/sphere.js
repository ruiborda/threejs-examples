import {SphereGeometry, MeshBasicMaterial, Mesh} from "three";

const geometry = new SphereGeometry(1, 100, 100);
const material = new MeshBasicMaterial({color: 0xfefefe});
const sphere = new Mesh(geometry, material);
sphere.position.y = 1
sphere.position.z = -4
export {sphere}