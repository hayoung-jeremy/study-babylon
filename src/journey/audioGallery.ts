import { Matrix, MeshBuilder, SpotLight, Vector3 } from "@babylonjs/core";
import { scene } from "./common";
import { addCircleToScene, addCrossToScene } from "./addGrid";

const initAudioGalleryExample = () => {
  const spotLight = new SpotLight("spotLight", new Vector3(0, 10, 0), new Vector3(0, -1, 0), Math.PI, 1, scene);

  const rotatingSphere = MeshBuilder.CreateSphere(
    "rotatingSphere",
    {
      diameter: 1,
      segments: 32,
    },
    scene
  );

  // Set initial position of the sphere
  const initialPosition = new Vector3(10, 0, 0);
  rotatingSphere.position = initialPosition.clone();

  let counter = 0;

  scene.onBeforeRenderObservable.add(() => {
    counter += 0.01;

    // Create a transformation matrix for rotating around the Y-axis
    const transformationMatrix = Matrix.RotationAxis(Vector3.Up(), counter);

    // Apply the rotation transformation to the initial position
    const newPosition = Vector3.TransformCoordinates(initialPosition, transformationMatrix);

    // Update the sphere's position
    rotatingSphere.position = newPosition;
  });

  addCrossToScene(scene);
  addCircleToScene(scene, 10, 120);
};

export default initAudioGalleryExample;
