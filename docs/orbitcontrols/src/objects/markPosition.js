import * as THREE from "../../../snowpack/pkg/three.js";
import surface_texture from "../../earth_surface.jpg.proxy.js";
const earthTexture = new THREE.TextureLoader().load( surface_texture );
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshBasicMaterial({
    color:0xffffff,
    transparent: false
})
export const markPosition = new THREE.Mesh(geometry, material)