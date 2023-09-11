import {
  CreateGreasedLine,
  CreateGround,
  CubeTexture,
  GreasedLineMeshColorMode,
  GreasedLineMeshMaterialType,
  GreasedLinePoints,
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

  const drawText = (points: GreasedLinePoints) => {
    const textLines = CreateGreasedLine(
      "textLines",
      {
        points,
      },
      {
        materialType: GreasedLineMeshMaterialType.MATERIAL_TYPE_PBR,
        colorMode: GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY,
        width: 0.8,
      }
    );

    return textLines;
  };

  const getFont = async () => {
    const response = await fetch(
      "https://res.cloudinary.com/edorblewebvr/raw/upload/v1688485231/Tilt_Neon_Regular_ubg5mu.json"
    );
    return response.json();
  };
};

export default initGreasedLineScene;
