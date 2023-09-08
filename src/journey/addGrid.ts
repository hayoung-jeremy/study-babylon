import { MeshBuilder, Vector3, Color3, Scene, Nullable } from "@babylonjs/core";

// Create lines to form a cross at the origin
const addCrossToScene = (scene: Scene) => {
  const points = [
    new Vector3(-1, 0, 0),
    new Vector3(1, 0, 0),
    new Vector3(0, -1, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, 0, -1),
    new Vector3(0, 0, 1),
  ];

  const lines = MeshBuilder.CreateLines("cross", { points }, scene);
  lines.color = new Color3(1, 0, 0);
};

// Create a circle with radius and number of divisions
const addCircleToScene = (scene: Nullable<Scene> | undefined, radius: number, divisions: number) => {
  const points = [];

  for (let i = 0; i <= divisions; i++) {
    const angle = (i / divisions) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    points.push(new Vector3(x, 0, z));
  }

  const circle = MeshBuilder.CreateLines("circle", { points }, scene);
  circle.color = new Color3(0.1, 0.4, 0.2);
};

export { addCircleToScene, addCrossToScene };
