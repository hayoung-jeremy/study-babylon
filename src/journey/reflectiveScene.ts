import { SceneLoader, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import { camera, engine, scene } from "./common";

const initReflectiveScene = () => {
  scene.createDefaultEnvironment({
    environmentTexture: "/envs/forest.env",
    skyboxTexture: "/envs/forest.env",
  });

  SceneLoader.ImportMeshAsync("", "/models/DamagedHelmet.glb", "", scene).then(helmet => {
    helmet.meshes[0].position.y = 2;
    camera.setTarget(helmet.meshes[0]);

    scene.onBeforeRenderObservable.add(() => {
      helmet.meshes[0].rotate(new Vector3(0, 1, 0), 0.001);
    });
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export default initReflectiveScene;
