import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Set up the renderer with transparency
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("model-viewer").appendChild(renderer.domElement);

// Set up the scene and camera
const scene = new THREE.Scene();
scene.background = null;
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

// Function to initialize OrbitControls
let controls;

function initializeControls() {
  if (controls) {
    controls.dispose();
    controls = null;
  }

  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.autoRotate = false;
    controls.target.set(0, 0, 0);
    controls.update();
  }
}

initializeControls();

// Set up the lighting
const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);

// Load the 3D model
const loader = new GLTFLoader().setPath("./model/");
let model;

loader.load(
  "scene.gltf",
  (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.65, 0.65, 0.65);
    scene.add(model);

    // Apply responsive scaling
    applyResponsiveScaling();
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error(error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (controls) {
    controls.update();
  }

  if (model) {
    model.rotation.y += 0.02;
  }

  renderer.render(scene, camera);
}
animate();

// Handle window resize events
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  initializeControls();
  applyResponsiveScaling();
});

// Function to handle model scaling based on viewport width
function applyResponsiveScaling() {
  if (!model) return;

  const width = window.innerWidth;

  if (width > 768 && width <= 1176) {
    model.scale.set(0.55, 0.55, 0.55); // Medium scale
  } else {
    model.scale.set(0.65, 0.65, 0.65); // Default scale
  }
}

// Add media query listeners for dynamic updates
const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1176px)");
mediaQuery.addEventListener("change", applyResponsiveScaling);
