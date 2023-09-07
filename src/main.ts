import "./style.css";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";

const canvas = document.getElementById("rendererCanvas") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.ArcRotateCamera("camera", 1, 1, 4, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

scene.createDefaultEnvironment({
  environmentTexture: "/envs/forest.env",
  skyboxTexture: "/envs/forest.env",
});

BABYLON.SceneLoader.ImportMeshAsync("", "/models/DamagedHelmet.glb", "", scene).then(helmet => {
  helmet.meshes[0].position.y = 2;
  camera.setTarget(helmet.meshes[0]);

  scene.onBeforeRenderObservable.add(() => {
    helmet.meshes[0].rotate(new BABYLON.Vector3(0, 1, 0), 0.001);
  });
});

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
