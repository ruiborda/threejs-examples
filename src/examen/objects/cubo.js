import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";

const geometry = new BoxGeometry(1, 1);
const material = new MeshBasicMaterial({color: 0x00ff00});
const cube = new Mesh(geometry, material);
cube.position.y = 1
cube.position.z = 4
export {cube}