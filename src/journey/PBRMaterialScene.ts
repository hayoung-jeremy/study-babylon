import {
  AbstractMesh,
  Color3,
  CreatePlane,
  CubeTexture,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { AdvancedDynamicTexture, StackPanel, TextBlock } from "@babylonjs/gui";
import { scene } from "./common";

const initPBRMaterialScene = () => {
  const hemisphereLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene);

  const hdrTexture = CubeTexture.CreateFromPrefilteredData("/envs/forest.env", scene);

  scene.environmentTexture = hdrTexture;
  scene.createDefaultSkybox(scene.environmentTexture);

  const pbr = new PBRMaterial("pbr", scene);
  pbr.metallic = 0.9;
  pbr.roughness = 0.05;

  const standard = new StandardMaterial("standard", scene);
  standard.diffuseColor = new Color3(0.9, 0, 0);
  standard.reflectionTexture = hdrTexture;

  const torusKnot = MeshBuilder.CreateTorusKnot(
    "torusKnot",
    { radius: 1, tube: 0.5, radialSegments: 120, tubularSegments: 120 },
    scene
  );
  torusKnot.position = new Vector3(-2, 0, 0);
  torusKnot.material = pbr;

  const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box.material = standard;
  box.position = new Vector3(2, 0, 0);

  const attachGuiToMesh = (targetMesh: AbstractMesh, planePosition: Vector3, textBlockMsg: string) => {
    const plane = CreatePlane("gui_plane", { width: 4, height: 4 }, scene);
    plane.parent = targetMesh; // Target mesh를 parent로 설정
    plane.position = planePosition; // Y-축을 따라 올림. 위치는 원하는 대로 조정 가능

    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane);

    const panel = new StackPanel();
    advancedTexture.addControl(panel);

    const textBlock = new TextBlock();
    textBlock.height = "110px";
    textBlock.text = textBlockMsg;
    textBlock.fontSize = 60;
    textBlock.color = "#000000";

    panel.addControl(textBlock);
  };

  attachGuiToMesh(torusKnot, new Vector3(0, 2.5, 0), "PBR Material");
  attachGuiToMesh(box, new Vector3(0, 1.5, 0), "Standard Material");
};

export default initPBRMaterialScene;
