import "./style.css";
import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("rendererCanvas") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.ArcRotateCamera("camera", 1, 1, 15, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});

const primitives = [];

for (let i = 0; i < 20; i++) {
  let sphere = BABYLON.MeshBuilder.CreateSphere("", {}, scene);
  sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
  primitives.push(sphere);
}

const directionalLight = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(0, -1, 0), scene);
const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 0, 0), scene);
const hemisphereLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
const spotLight = new BABYLON.SpotLight(
  "spotLight",
  new BABYLON.Vector3(0, 0, 0),
  new BABYLON.Vector3(0, 1, 0),
  Math.PI / 4,
  1,
  scene
);

directionalLight.diffuse = new BABYLON.Color3(1, 0, 0);
pointLight.diffuse = new BABYLON.Color3(0, 0, 1);
hemisphereLight.diffuse = new BABYLON.Color3(1, 1, 0);
spotLight.diffuse = new BABYLON.Color3(0, 1, 0);
