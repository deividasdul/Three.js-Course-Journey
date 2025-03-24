import * as THREE from "three";

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.position.z = -1;
mesh.position.set(1, 1, 1);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);

cube2.position.x = 2;
cube3.position.x = -1;

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.position.y = 1;

mesh.scale.x = 2;

mesh.rotation.reorder("XYZ");
mesh.rotation.y = Math.PI;

// scene.add(mesh);

// Position and center of screen
console.log(mesh.position.length());

// Axes helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);

camera.lookAt(group.position);

// Distance to camera
console.log(mesh.position.distanceTo(camera.position));
// Takes vector and reduces it to 1
mesh.position.normalize();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
