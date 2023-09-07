import { ArcRotateCamera, Engine, Scene, Vector3 } from "@babylonjs/core";

export const canvas = document.getElementById("rendererCanvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const engine = new Engine(canvas, true);
export const scene = new Scene(engine);

export const camera = new ArcRotateCamera("camera", 1, 1, 20, new Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
