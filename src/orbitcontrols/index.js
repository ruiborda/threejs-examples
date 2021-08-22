import * as THREE from 'three';
import {Detector} from "./src/detector";
import globe_manipulator from "./src/globle_manipulator";

var camera, scene, renderer;
var stats;
var mesh, radius, helper_1, helper_2;
var gui;
var city_name = "";
var target_latlng = "";
var actual_latlng = "";

init();
animate();

function init() {
    if ( ! Detector.webgl )
        Detector.addGetWebGLMessage();

    renderer = new THREE.WebGLRenderer( { antialias: true });
    renderer.setClearColor( 0x222222, 1.0 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    var ambient_light = new THREE.AmbientLight(0xcccccc);
    scene.add(ambient_light);

    radius = 500;
    var segments = 64;
    var rings = 64;
    var surface_texture = "textures/earth_surface.jpg";
    var geometry = new THREE.SphereGeometry(radius, segments, rings);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: THREE.ImageUtils.loadTexture(surface_texture),
        transparent: false
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var helper_geometry = new THREE.SphereGeometry( 2, 32, 32 );
    helper_1 = new THREE.Mesh( helper_geometry, new THREE.MeshNormalMaterial() );
    scene.add( helper_1 )
    helper_2 = new THREE.Mesh( helper_geometry, new THREE.MeshNormalMaterial() );
    scene.add( helper_2 )

    globe_manipulator = new globe_manipulator({
        dom_object: renderer.domElement,
        camera: camera,
        radius: radius,
        on_clicked_callback: onClicked,
        auto_rotate: true,
        right_click_to_select: true,
        start_lat: 0.0,
        start_lng: 0.0,
        start_distance: 900.0,
        min_distance: 560.0,
        max_distance: 1200.0,
        mesh: mesh
    });

    gui = new dat.GUI();
    gui.add(this,"gotoRandomCity").name("Random City");
    gui.add(this, 'city_name').name("City:").listen();
    gui.add(this, 'target_latlng').name("Target:").listen();
    gui.add(this, 'actual_latlng').name("Actual:").listen();
    gui.add(this,"resetGlobe").name("Reset");

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild(stats.domElement);

    window.addEventListener( 'resize', onWindowResize, false );

    gotoRandomCity();
}

function onClicked(event) {

    if ( event.mouse_event.button == 2 ) {
        if ( event.intersects ) {
            actual_latlng = "Lat: " + event.lat.toFixed(2) + "  Lng: " + event.lng.toFixed(2);

            var phi = (90.0 - event.lat) * Math.PI / 180.0;
            var theta = (360.0 - event.lng) * Math.PI / 180.0;
            var x = radius * Math.sin(phi) * Math.cos(theta);
            var y = radius * Math.cos(phi);
            var z = radius * Math.sin(phi) * Math.sin(theta);

            helper_2.position.set( x, y, z );

        }
        else {
            actual_latlng = "Missed";
        }
    }
}

function resetGlobe() {

    globe_manipulator.reset();
    city_name = "";
    target_latlng = "";
    actual_latlng = "";
    helper_1.position.set( 0, 0, 0 );
    helper_2.position.set( 0, 0, 0 );
}

function gotoRandomCity() {

    var index = Math.floor( Math.random() * city_locations.length );

    var name = city_locations[index].name;
    var lat = city_locations[index].lat;
    var lng = city_locations[index].lng;

    var phi = (90.0 - lat) * Math.PI / 180.0;
    var theta = (360.0 - lng) * Math.PI / 180.0;
    var x = radius * Math.sin(phi) * Math.cos(theta);
    var y = radius * Math.cos(phi);
    var z = radius * Math.sin(phi) * Math.sin(theta);

    helper_1.position.set( x, y, z );

    city_name = name;
    target_latlng = "Lat: " + lat.toFixed(2) + "  Lng: " + lng.toFixed(2);

    globe_manipulator.set_lat_lng(lat, lng);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame(animate);

    globe_manipulator.update();
    stats.update();

    renderer.render(scene, camera);
}