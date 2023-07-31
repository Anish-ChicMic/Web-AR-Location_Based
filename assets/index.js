// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     var R = 6371; // Radius of the earth in km
//     var dLat = deg2rad(lat2 - lat1);  // deg2rad below
//     var dLon = deg2rad(lon2 - lon1);
//     var a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2)
//         ;
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c; // Distance in km
//     return d;
// }

// function deg2rad(deg) {
//     return deg * (Math.PI / 180)
// }


// // window.onload = () => {
// // const distanceTag = document.querySelector('p');
// // let dis = getDistanceFromLatLonInKm(30.709330, 76.689280, 30.7132906, 76.6908791)
// // console.log(`distance: ${dis}`)
// // }

// // getting places from APIs
// function loadPlaces(position) {
//     const params = {
//         radius: 300,    // search places not farther than this value (in meters)
//         clientId: 'P0BIDVPVK41ZDJ3OVK2I0F1FKOG1QNZAYT3JWP5MBJZWXGL0',
//         clientSecret: 'GBZ3V1HLMI0JFA3S1EHAKCWZ0TX0JH2IOK25SREJGD3ENHGL',
//         version: '20300101',    // foursquare versioning, required but unuseful for this demo
//     };

//     // CORS Proxy to avoid CORS problems
//     const corsProxy = 'https://cors-anywhere.herokuapp.com/';

//     // Foursquare API (limit param: number of maximum places to fetch)
//     const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
//         &ll=${position.latitude},${position.longitude}
//         &radius=${params.radius}
//         &client_id=${params.clientId}
//         &client_secret=${params.clientSecret}
//         &limit=30 
//         &v=${params.version}`;
//     return fetch(endpoint)
//         .then((res) => {
//             return res.json()
//                 .then((resp) => {
//                     return resp.response.venues;
//                 })
//         })
//         .catch((err) => {
//             console.error('Error with places API', err);
//         })
// };


// window.onload = () => {
//     const scene = document.querySelector('a-scene');

//     // first get current user location
//     return navigator.geolocation.getCurrentPosition(function (position) {

//         // than use it to load from remote APIs some places nearby
//         loadPlaces(position.coords)
//             .then((places) => {
//                 places.forEach((place) => {
//                     const latitude = place.location.lat;
//                     const longitude = place.location.lng;

//                     // add place name
//                     const placeText = document.createElement('a-link');
//                     placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
//                     placeText.setAttribute('title', place.name);
//                     placeText.setAttribute('scale', '15 15 15');

//                     placeText.addEventListener('loaded', () => {
//                         window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
//                     });

//                     scene.appendChild(placeText);
//                 });
//             })
//     },
//         (err) => console.error('Error in retrieving position', err),
//         {
//             enableHighAccuracy: true,
//             maximumAge: 0,
//             timeout: 27000,
//         }
//     );
// };

// fsq3xfCpUVV8wIgyv5fpUzHdB6G59t5GDszGA6tvu7lchH8=






// 3D model with ThreeJs
//////////////////////////////////////////////////////////////////////////////////
//		Init
//////////////////////////////////////////////////////////////////////////////////

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.min.js" integrity="sha512-n8IpKWzDnBOcBhRlHirMZOUvEq2bLRMuJGjuVqbzUJwtTsgwOgK5aS0c1JA647XWYfqvXve8k3PtZdzpipFjgg==" crossorigin="anonymous"></script>
<script src="https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js"></script> -->

<!-- ar.js -->
<!-- <script src="../build/ar-threex.js"></script> -->
<script src="./ThreeX/ar-threex.js"></script> */}
// import { THREE } from "./ThreeJs/three.min.js";
import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from '../node_modules//three/examples/jsm/loaders/GLTFLoader';
import { THREEx } from "../ThreeX/ar-threex.js";

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: "mediump",
});

var clock = new THREE.Clock();

var mixers = [];

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setClearColor(new THREE.Color("lightgrey"), 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
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

////////////////////////////////////////////////////////////////////////////////
//          handle arToolkitSource
////////////////////////////////////////////////////////////////////////////////

var arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
    sourceWidth: 480,
    sourceHeight: 640,
});

arToolkitSource.init(function onReady() {
    // use a resize to fullscreen mobile devices
    setTimeout(function () {
        onResize();
    }, 1000);
});

// handle resize
window.addEventListener("resize", function () {
    onResize();
});

// listener for end loading of NFT marker
window.addEventListener("arjs-nft-loaded", function (ev) {
    console.log(ev);
});

function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
}

////////////////////////////////////////////////////////////////////////////////
//          initialize arToolkitContext
////////////////////////////////////////////////////////////////////////////////

// create atToolkitContext
var arToolkitContext = new THREEx.ArToolkitContext(
    {
        detectionMode: "mono",
        canvasWidth: 480,
        canvasHeight: 640,
    },
    {
        sourceWidth: 480,
        sourceHeight: 640,
    }
);

// initialize it
arToolkitContext.init(function onCompleted() {
    // copy projection matrix to camera
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

////////////////////////////////////////////////////////////////////////////////
//          Create a ArMarkerControls
////////////////////////////////////////////////////////////////////////////////

// init controls for camera
var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: "nft",
    descriptorsUrl: "data/dataNFT/pinball",
    changeMatrixMode: "cameraTransformMatrix",
});

scene.visible = false;

var root = new THREE.Object3D();
scene.add(root);

//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

var threeGLTFLoader = new THREE.GLTFLoader();
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );
var model;

threeGLTFLoader.load("./assets/Flamingo.glb", function (gltf) {
    model = gltf.scene.children[0];
    model.name = "Flamingo";
    const clips = gltf.animations;

    var animation = gltf.animations[0];
    var mixer = new THREE.AnimationMixer(gltf.scene);
    mixers.push(mixer);
    const clip = THREE.AnimationClip.findByName(clips, "flamingo_flyA_");
    var action = mixer.clipAction(clip);
    action.play();

    root.matrixAutoUpdate = false;
    root.add(model);

    model.position.z = -100;
    //model.position.z = 100;

    window.addEventListener("arjs-nft-init-data", function (nft) {
        console.log(nft);
        var msg = nft.detail;
        model.position.y = ((msg.height / msg.dpi) * 2.54 * 10) / 2.0; //y axis?
        model.position.x = ((msg.width / msg.dpi) * 2.54 * 10) / 2.0; //x axis?
    });

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

        arToolkitContext.update(arToolkitSource.domElement);

        // update scene.visible if the marker is seen
        scene.visible = camera.visible;

        renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);
});