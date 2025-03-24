import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const cubeTextureLoader = new THREE.CubeTextureLoader();

const cubeTexture = cubeTextureLoader.load([
  `/textures/environmentMaps/1/px.jpg`,
  `/textures/environmentMaps/1/nx.jpg`,
  `/textures/environmentMaps/1/py.jpg`,
  `/textures/environmentMaps/1/ny.jpg`,
  `/textures/environmentMaps/1/pz.jpg`,
  `/textures/environmentMaps/1/nz.jpg`,
]);

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

// const material = new THREE.MeshBasicMaterial({ color: "red" });
// material.map = colorTexture;
// material.color = new THREE.Color("yellow");
// material.color.set("green");
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.2;
// material.alphaMap = alphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial({ color: "red" });
// material.side = THREE.DoubleSide;
// material.flatShading = true;

// Useful for simulating lights without light
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// Fogs, pre-processing
// const material = new THREE.MeshDepthMaterial();

const ambientLight = new THREE.AmbientLight("white", 0.5);

scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("red");

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial();
// material.aoMap = ambientOcclusionTexture;
material.envMap = cubeTexture;

gui.add(material, "roughness").min(0).max(1).step(0.1);
gui.add(material, "metalness").min(0).max(1).step(0.1);

material.metalness = 0.7;
material.roughness = 0.2;
// material.map = colorTexture;
// gui.add(material, "aoMapIntensity", 0, 10, 0.1);
// material.aoMapIntensity = 10;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;

const sphere = new THREE.SphereGeometry(0.5, 64, 64);
const plane = new THREE.PlaneGeometry(1, 1, 100, 100);
const torus = new THREE.TorusGeometry(0.3, 0.2, 16, 32);

const sphereMesh = new THREE.Mesh(sphere, material);
const planeMesh = new THREE.Mesh(plane, material);

planeMesh.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeMesh.geometry.attributes.uv.array, 2)
);

const torusMesh = new THREE.Mesh(torus, material);

sphereMesh.position.set(1.5, 0, 0);
torusMesh.position.set(-1.5, 0, 0);

scene.add(sphereMesh, planeMesh, torusMesh);
// scene.add(planeMesh);
// scene.add(torusMesh);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  torusMesh.rotation.y += 0.01;
  planeMesh.rotation.y += 0.001;
  sphereMesh.rotation.y += 0.01;

  torusMesh.rotation.x += 0.01;
  planeMesh.rotation.x += 0.001;
  sphereMesh.rotation.x += 0.01;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
