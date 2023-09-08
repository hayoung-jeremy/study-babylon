import { Color3, DirectionalLight, HemisphericLight, Mesh, MeshBuilder, PointLight, SpotLight, Vector3 } from "@babylonjs/core";
import { scene } from "./common";

const initLightExample = () => {
  const primitives: Mesh[] = [];

  for (let i = 0; i < 140; i++) {
    let sphere = MeshBuilder.CreateSphere("", {}, scene);
    sphere.position = new Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
    primitives.push(sphere);
  }

  const directionalLight = new DirectionalLight("directionalLight", new Vector3(0, -1, 0), scene);
  const pointLight = new PointLight("pointLight", new Vector3(0, 0, 0), scene);
  const hemisphereLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene);
  const spotLight = new SpotLight(
    "spotLight",
    new Vector3(0, 10, 0),
    new Vector3(0, -1, 0),
    Math.PI / 4,
    1,
    scene
  );

  directionalLight.diffuse = new Color3(1, 0, 0);
  pointLight.diffuse = new Color3(0, 0, 1);
  hemisphereLight.diffuse = new Color3(1, 1, 0);
  spotLight.diffuse = new Color3(0, 1, 0);

  const currentLight = document.getElementById("currentLight") as HTMLParagraphElement;

  directionalLight.setEnabled(false);
  pointLight.setEnabled(false);
  hemisphereLight.setEnabled(false);
  spotLight.setEnabled(false);
  currentLight.textContent = "No lights on";

  window.addEventListener("keydown", event => {
    directionalLight.setEnabled(false);
    pointLight.setEnabled(false);
    hemisphereLight.setEnabled(false);
    spotLight.setEnabled(false);
    currentLight.textContent = "No lights on";

    switch (event.key) {
      case "1":
        directionalLight.setEnabled(true);
        currentLight.textContent = "Directional light";
        break;
      case "2":
        pointLight.setEnabled(true);
        currentLight.textContent = "Point light";
        break;
      case "3":
        hemisphereLight.setEnabled(true);
        currentLight.textContent = "Hemisphere light";
        break;
      case "4":
        spotLight.setEnabled(true);
        currentLight.textContent = "Spot light";
        break;
      default:
        break;
    }
  });

  let counter = 0;

  scene.onBeforeRenderObservable.add(() => {
    counter += 0.01;
    primitives.forEach((primitive, index) => {
      primitive.position.x += Math.sin(index + counter) / 700;
      primitive.position.y += Math.cos(index + counter) / 700;
      primitive.position.z += Math.sin(index + counter) / 700;
    });

    if (spotLight.isEnabled()) {
      spotLight.direction = new Vector3(Math.sin(counter), -1, 0);
    }
  });
};

export default initLightExample;
