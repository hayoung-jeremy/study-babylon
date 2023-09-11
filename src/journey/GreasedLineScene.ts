import {
  CreateGround,
  CubeTexture,
  HemisphericLight,
  PBRMaterial,
  Vector3,
} from "@babylonjs/core";

import { scene } from "./common";

const initGreasedLineScene = () => {
  const hemisphereLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene);

  const ground = CreateGround("ground", {
    width: 500,
    height: 500,
  });
  const groundMat = new PBRMaterial("ground", scene);
  ground.material = groundMat;

  const envTexture = CubeTexture.CreateFromPrefilteredData("/envs/night.env", scene);
  scene.environmentTexture = envTexture;
  scene.createDefaultSkybox(scene.environmentTexture);
};

export default initGreasedLineScene;
