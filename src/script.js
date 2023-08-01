import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
// import { THREEx } from "./ThreeX/ar-threex.js";
// import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only'
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()
// console.log("threex>", THREEx)
// /**
//  * Lights
//  */
// // Ambient light
// const ambientLight = new THREE.AmbientLight()
// ambientLight.color = new THREE.Color(0xffffff)
// ambientLight.intensity = 0.5
// scene.add(ambientLight)

// // Directional light
// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
// directionalLight.position.set(1, 0.25, 0)
// scene.add(directionalLight)

// // Hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
// scene.add(hemisphereLight)

// // Point light
// const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
// pointLight.position.set(1, - 0.5, 1)
// scene.add(pointLight)

// // Rect area light
// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
// rectAreaLight.position.set(- 1.5, 0, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

// // Spot light
// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 2, 3)
// scene.add(spotLight)

// spotLight.target.position.x = - 0.75
// scene.add(spotLight.target)

// // Helpers
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(pointLightHelper)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
// scene.add(rectAreaLightHelper)

// /**
//  * Objects
//  */
// // Material
// const material = new THREE.MeshStandardMaterial()
// material.roughness = 0.4

// // Objects
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     material
// )
// sphere.position.x = - 1.5

// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(0.75, 0.75, 0.75),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 32, 64),
//     material
// )
// torus.position.x = 1.5

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(5, 5),
//     material
// )
// plane.rotation.x = - Math.PI * 0.5
// plane.position.y = - 0.65

// scene.add(sphere, cube, torus, plane)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 1
// camera.position.y = 1
// camera.position.z = 2
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     sphere.rotation.y = 0.1 * elapsedTime
//     cube.rotation.y = 0.1 * elapsedTime
//     torus.rotation.y = 0.1 * elapsedTime

//     sphere.rotation.x = 0.15 * elapsedTime
//     cube.rotation.x = 0.15 * elapsedTime
//     torus.rotation.x = 0.15 * elapsedTime

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()


// ************************************************************************************************************
// function main() {
//     const canvas = document.querySelector('canvas.webgl')
//     console.log("dafkf", THREE, THREEx);
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
//     const renderer = new THREE.WebGLRenderer({ canvas: canvas });

//     const arjs = new THREEx.LocationBased(scene, camera);
//     const cam = new THREEx.WebcamRenderer(renderer);

//     const geom = new THREE.BoxGeometry(20, 20, 20);
//     const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });

//     const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

//     let fetched = false;

//     // Handle the "gpsupdate" event on the LocationBased object
//     // This triggers when a GPS update (from the Geolocation API) occurs
//     // 'pos' is the position object from the Geolocation API.

//     arjs.on("gpsupdate", async (pos) => {
//         if (!fetched) {
//             const response = await fetch(`https://hikar.org/webapp/map?bbox=${pos.coords.longitude - 0.01},${pos.coords.latitude - 0.01},${pos.coords.longitude + 0.01},${pos.coords.latitude + 0.01}&layers=poi&outProj=4326`);

//             const geojson = await response.json();

//             geojson.features.forEach(feature => {
//                 const box = new THREE.Mesh(geom, mtl);
//                 arjs.add(box, feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
//             });

//             fetched = true;
//         }
//     });

//     arjs.startGps();

//     requestAnimationFrame(render);

//     function render() {
//         if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
//             renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
//             const aspect = canvas.clientWidth / canvas.clientHeight;
//             camera.aspect = aspect;
//             camera.updateProjectionMatrix();
//         }

//         // Update the scene using the latest sensor readings
//         deviceOrientationControls.update();

//         cam.update();
//         renderer.render(scene, camera);
//         requestAnimationFrame(render);
//     }
// }

// main();

// ************************************************************************************************************


//////////////////////////////////////////////////////////////////////////////////
//		Init
//////////////////////////////////////////////////////////////////////////////////

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: 'mediump',
});

var clock = new THREE.Clock();

var mixers = [];

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setClearColor(new THREE.Color('lightgrey'), 0)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = '0px'
renderer.domElement.style.left = '0px'
document.body.appendChild(renderer.domElement);

// init scene and camera
var scene = new THREE.Scene();

//////////////////////////////////////////////////////////////////////////////////
//		Initialize a basic camera
//////////////////////////////////////////////////////////////////////////////////

// Create a camera
var camera = new THREE.Camera();
scene.add(camera);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

var pointLight = new THREE.PointLight(0xF9CA29, 0.7);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

var dLight = new THREE.DirectionalLight(0x2975F9, 1);
light.position.set(0, 20, 30);
light.castShadow = true;
scene.add(dLight);

////////////////////////////////////////////////////////////////////////////////
//          handle arToolkitSource
////////////////////////////////////////////////////////////////////////////////

var arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
    sourceWidth: 480,
    sourceHeight: 640,
})

arToolkitSource.init(function onReady() {
    // use a resize to fullscreen mobile devices
    setTimeout(function () {
        onResize()
    }, 1000);
})

// handle resize
window.addEventListener('resize', function () {
    onResize()
})

// listener for end loading of NFT marker
window.addEventListener('arjs-nft-loaded', function (ev) {
    var heading = document.getElementById('heading');
    // heading.innerHTML = 'Loaded! 1st';
    console.log(ev);
})

function onResize() {
    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(renderer.domElement)
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
}

////////////////////////////////////////////////////////////////////////////////
//          initialize arToolkitContext
////////////////////////////////////////////////////////////////////////////////

// create atToolkitContext
// THREEx.ArToolkitContext.baseURL = '../'
var arToolkitContext = new THREEx.ArToolkitContext({
    detectionMode: 'mono',
    canvasWidth: 480,
    canvasHeight: 640,
}, {
    sourceWidth: 480,
    sourceHeight: 640,
})
arToolkitContext.baseURL = '../';
// initialize it
arToolkitContext.init(function onCompleted() {
    // copy projection matrix to camera
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
})

////////////////////////////////////////////////////////////////////////////////
//          Create a ArMarkerControls
////////////////////////////////////////////////////////////////////////////////

// init controls for camera
var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: 'nft',
    descriptorsUrl: 'data/dataNFT/pinball',
    changeMatrixMode: 'cameraTransformMatrix'
})

scene.visible = false

var root = new THREE.Object3D();
scene.add(root);

//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

var threeGLTFLoader = new GLTFLoader();
var model;

threeGLTFLoader.load("./Flamingo.glb", function (gltf) {
    model = gltf.scene;
    var animation = gltf.animations[0];
    var mixer = new THREE.AnimationMixer(gltf.scene);
    mixers.push(mixer);
    const action = mixer.clipAction(animation);
    action.play();

    root.matrixAutoUpdate = false;
    root.add(model);

    model.position.z = -100;
    //model.position.z = 100;

    window.addEventListener('arjs-nft-init-data', function (nft) {
        var msg = nft.detail;
        console.log("hey:", msg);
        model.position.y = (msg.height / msg.dpi * 2.54 * 10) / 2.0; //y axis?
        model.position.x = (msg.width / msg.dpi * 2.54 * 10) / 2.0; //x axis?
        model.rotation.x += 20;
        model.rotation.y += 20;
        model.rotation.z += 40;
        camera.lookAt(model.position);
        var heading = document.getElementById('heading');
        heading.innerHTML = `${msg.detail}`;
    })


    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////

    var animate = function () {
        requestAnimationFrame(animate);

        if (mixers.length > 0) {
            for (var i = 0; i < mixers.length; i++) {
                mixers[i].update(clock.getDelta());
            }
        }

        if (!arToolkitSource.ready) {
            return;
        }

        arToolkitContext.update(arToolkitSource.domElement)

        // update scene.visible if the marker is seen
        scene.visible = camera.visible;

        renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);
}
);