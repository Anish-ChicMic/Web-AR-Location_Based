import * as THREE from 'three'
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas1'),
        antialias: true,
        alpha: true,
        precision: 'mediump',
    });
    // scene.add(camera);
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var pointLight = new THREE.PointLight("rgb(249, 202, 41, 100)", 0.7);
    pointLight.position.set(0, 20, 30);
    scene.add(pointLight);

    var dLight = new THREE.DirectionalLight("rgb(66, 165, 245, 100)", 1);
    light.position.set(0, 20, 30);
    light.castShadow = true;
    scene.add(dLight);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild(renderer.domElement);

    const geom = new THREE.BoxGeometry(20, 20, 20);
    var clock = new THREE.Clock();
    // var root = new THREE.Object3D();
    // scene.add(root);
    // var threeGLTFLoader = new GLTFLoader();
    // var model;
    // var mixers = [];

    // threeGLTFLoader.load("./Flamingo.glb", function (gltf) {
    //     model = gltf.scene;
    //     var animation = gltf.animations[0];
    //     var mixer = new THREE.AnimationMixer(gltf.scene);
    //     mixers.push(mixer);
    //     const action = mixer.clipAction(animation);
    //     action.play();

    //     root.matrixAutoUpdate = false;
    //     root.add(model);

    //     model.position.z = -100;
    //     //model.position.z = 100;
    // })

    const arjs = new THREEx.LocationBased(scene, camera);

    // You can change the minimum GPS accuracy needed to register a position - by default 1000m
    //const arjs = new THREEx.LocationBased(scene, camera. { gpsMinAccuracy: 30 } );
    const cam = new THREEx.WebcamRenderer(renderer, '#video1');

    const mouseStep = THREE.MathUtils.degToRad(5);


    let orientationControls;

    // Orientation controls only work on mobile device
    if (isMobile()) {
        orientationControls = new THREEx.DeviceOrientationControls(camera);
    }

    let fake = null;
    let first = true;

    arjs.on("gpsupdate", pos => {
        if (first) {
            setupObjects(pos.coords.longitude, pos.coords.latitude);
            first = false;
        }
    });

    arjs.on("gpserror", code => {
        alert(`GPS error: code ${code}`);
    });

    // Uncomment to use a fake GPS location
    fake = { lat: 51.05, lon: -0.72 };
    if (fake) {
        arjs.fakeGps(fake.lon, fake.lat);
    } else {
        arjs.startGps();
    }


    let mousedown = false, lastX = 0;

    // Mouse events for testing on desktop machine
    if (!isMobile()) {
        window.addEventListener("mousedown", e => {
            mousedown = true;
        });

        window.addEventListener("mouseup", e => {
            mousedown = false;
        });

        window.addEventListener("mousemove", e => {
            if (!mousedown) return;
            if (e.clientX < lastX) {
                camera.rotation.y += mouseStep;
                if (camera.rotation.y < 0) {
                    camera.rotation.y += 2 * Math.PI;
                }
            } else if (e.clientX > lastX) {
                camera.rotation.y -= mouseStep;
                if (camera.rotation.y > 2 * Math.PI) {
                    camera.rotation.y -= 2 * Math.PI;
                }
            }
            lastX = e.clientX;
        });
    }

    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            return true;
        }
        return false;
    }


    var mixers = []
    function render(time) {
        resizeUpdate();
        if (orientationControls) orientationControls.update();
        cam.update();

        ///
        if (mixers.length > 0) {
            for (var i = 0; i < mixers.length; i++) {
                mixers[i].update(clock.getDelta());
            }
        }

        // if (!arToolkitSource.ready) {
        //     return;
        // }

        // arToolkitContext.update(arToolkitSource.domElement)

        // update scene.visible if the marker is seen
        scene.visible = camera.visible;

        // renderer.render(scene, camera);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function resizeUpdate() {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth, height = canvas.clientHeight;
        if (width != canvas.width || height != canvas.height) {
            renderer.setSize(width, height, false);
        }
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    function setupObjects(longitude, latitude) {
        // Use position of first GPS update (fake or real)
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        // const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        // const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // arjs.add(new THREE.Mesh(geom, material), longitude, latitude + 0.001); // slightly north
        // arjs.add(new THREE.Mesh(geom, material2), longitude, latitude - 0.001); // slightly south
        // arjs.add(new THREE.Mesh(geom, material3), longitude - 0.001, latitude); // slightly west
        // arjs.add(new THREE.Mesh(geom, material4), longitude + 0.001, latitude); // slightly east


        // The below code not working yet
        var root = new THREE.Object3D();
        scene.add(root);
        var threeGLTFLoader = new GLTFLoader();
        var model;
        // var mixers = []
        threeGLTFLoader.load("./Flamingo.glb", function (gltf) {
            model = gltf.scene;
            var animation = gltf.animations[0];
            var mixer = new THREE.AnimationMixer(gltf.scene);
            mixers.push(mixer);
            const action = mixer.clipAction(animation);
            action.play();
            console.log(model);
            root.matrixAutoUpdate = false;
            // root.add(model);
            scene.add(model)

            model.position.x = -100;
            model.position.y = 10;
            model.position.z = -100;
            console.log("Flamino Added", model)
        })
        arjs.add(scene, longitude, latitude + 0.001); // slightly north
    }


    requestAnimationFrame(render);
}

main();
