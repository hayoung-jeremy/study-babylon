import "./style.css";
import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("rendererCanvas") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.ArcRotateCamera("camera", 1, 1, 4, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
