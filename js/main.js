'use strict';

//color palette
var Colors = {
  red:0xf25346,
  white:0xd8d0d1,
  brown:0x59332e,
  pink:0xF5986E,
  brownDark:0x23190f,
  blue:0x68c3c0,
};

///////////////////////////////create the scene//////////////////////////////////
// Three.js variables
var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

// Screen variables
var HEIGHT, WIDTH;

function createScene () {
   HEIGHT = window.innerHeight;
   WIDTH = window.innerWidth;

   //1. create the scene
   scene = new THREE.Scene();
   scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

   //2. create a camera
   fieldOfView = 60;
   aspectRatio = WIDTH / HEIGHT;
   nearPlane = 1;
   farPlane = 1000;
   camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

   camera.position.x = 0;
   camera.position.y = 100;
   camera.position.z = 200;

   //3. create the renderer
   renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias: true
   });
   renderer.setSize(WIDTH, HEIGHT);
   renderer.shadowMap.enabled = true;

   //4. add into HTML
   container = document.getElementById('world');
   container.appendChild(renderer.domElement);

   //5. make the scene resizale
   window.addEventListener('resize', function () {
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;
      //update renderer
      renderer.setSize(WIDTH, HEIGHT);
      //update camera
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix(); 
   }, false);
}

///////////////////////////////create the light//////////////////////////////////
var hemisphereLight, shadowLight;

function createLights() {
  //create the hemisphere light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

  //create the directional light
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  //add them to the scene
  scene.add(hemisphereLight);  
  scene.add(shadowLight);
}

///////////////////////////////create the sea//////////////////////////////////
function Sea () {
  //1. create a geometry
  var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  //2. create a material
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    transparent: true,
    opacity: 0.8,
    shading: THREE.FlatShading
  });

  //3. pass geom and mat to a mesh
  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
}

var sea;

function createSea () {
  sea = new Sea();
  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
}

function init () {
  createScene();
  createLights();
  createSea();
  // createSky();
  // createPlane();

  //render
  renderer.render(scene, camera);
}


window.addEventListener('load', init, false);


