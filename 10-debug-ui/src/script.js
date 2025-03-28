import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
// import * as dat from "dat.gui";
import GUI from "lil-gui";

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Debug
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("Red Cube X");
gui.add(mesh.position, "y", -10, 10, 0.01);
gui.add(mesh.position, "z", -10, 10, 0.01);

gui.add(mesh, "visible").name("Show Red Cube");
gui.add(mesh.material, "wireframe").name("Show Red Cube Wireframe");

gui.addColor(mesh.material, "color");

var jump = false;

const guiFunctions = {
  spin: () => {
    gsap.to(mesh.rotation, {
      delay: 1,
      y: mesh.rotation.y + Math.PI * 2,
      duration: 1,
    });
  },
  jump: () => {
    jump = !jump;
  },
};

gui.add(guiFunctions, "spin");
gui.add(guiFunctions, "jump");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (jump) {
    mesh.position.y = Math.sin(elapsedTime);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
