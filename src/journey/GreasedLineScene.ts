import {
  Color3,
  CreateGreasedLine,
  CreateGround,
  CreateText,
  CubeTexture,
  GreasedLineMeshColorMode,
  GreasedLineMeshMaterialType,
  GreasedLinePoints,
  GreasedLineTools,
  HemisphericLight,
  Mesh,
  PBRMaterial,
  Vector3,
} from "@babylonjs/core";
import earcut from "earcut";

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

  getFont().then(font => {
    // GreasedLine
    const greasedLinePoints = GreasedLineTools.GetPointsFromText("Greased Line", 8, 64, font);

    const greasedLine = drawText(greasedLinePoints);
    greasedLine.position.y = 10;
    const pbrGreasedLine = greasedLine.material as PBRMaterial;
    pbrGreasedLine.metallic = 0.8;
    pbrGreasedLine.roughness = 0.4;
    pbrGreasedLine.emissiveColor = Color3.Yellow();
    pbrGreasedLine.emissiveIntensity = 0.5;

    // Tinted Greased Line
    const greasedLineTintPoints = GreasedLineTools.GetPointsFromText("Tinted Greased Line", 8, 64, font);

    const greasedLineTint = drawText(greasedLineTintPoints);
    greasedLineTint.position.y = 22;
    const pbrTint = greasedLineTint.material as PBRMaterial;
    pbrTint.metallic = 0;
    pbrTint.roughness = 0;
    pbrTint.subSurface.isRefractionEnabled = true;
    pbrTint.subSurface.indexOfRefraction = 1.5;
    pbrTint.subSurface.tintColor = new Color3(0.55, 0.55, 0.55);
    pbrTint.emissiveColor = new Color3(0.55, 0.55, 0.55);
    pbrTint.emissiveIntensity = 0.5;

    // Geo Text
    const geoText = CreateText(
      "geoText",
      "Geo Text",
      font,
      { size: 8, resolution: 64, depth: 3 },
      scene,
      earcut
    ) as Mesh;
    geoText.position.y = 34;

    const geoMat = new PBRMaterial("geoMat", scene);
    geoMat.metallic = 0.9;
    geoMat.roughness = 0;
    geoMat.albedoColor = Color3.Yellow();
    geoText.material = geoMat;
  });
};

export default initGreasedLineScene;
