import {Mesh, MeshBasicMaterial, PlaneGeometry} from "../../snowpack/pkg/three.js";

const planeGeometry = new PlaneGeometry(5, 10)
const planeMaterial = new MeshBasicMaterial({color: 0x0e0e0e})
const plane = new Mesh(planeGeometry, planeMaterial)
plane.position.x = 0
plane.rotation.x = -Math.PI/2
export {plane}