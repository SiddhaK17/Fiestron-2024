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
scene.background = null; // Set background to null for transparency
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1, // Near plane
  1000
);
camera.position.set(0, 1, 5); // Camera positioned slightly back and above the model

// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2; // Adjust the min distance to avoid cutting off the model
controls.maxDistance = 20;
controls.minPolarAngle = 0; // Allow viewing from below
controls.maxPolarAngle = Math.PI; // Allow viewing from above
controls.autoRotate = false;
controls.target.set(0, 0, 0); // Make sure the target is set correctly
controls.update();

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
    model.position.set(-2, 0, 0); // Center the model
    model.scale.set(0.65, 0.65, 0.65); // Scale down the model as needed
    scene.add(model);
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
  controls.update(); // Update controls

  if (model) {
    model.rotation.y += 0.02; // Rotate around Y-axis
  }

  renderer.render(scene, camera);
}
animate();

// Handle window resize events
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
