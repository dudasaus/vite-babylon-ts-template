import "./style.scss";
import "@babylonjs/loaders/glTF";
import { App } from "./app";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Tools } from "@babylonjs/core/Misc/tools";
import { houseUrl } from "./asset_loader";

async function createStarterScene(app: App) {
  // Creates and positions a free camera
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), app.scene);
  // Targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  // Attaches the camera to the canvas
  camera.attachControl(app.canvasElement, true);
  // Creates a light, aiming 0,1,0
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), app.scene);
  // Dim the light a small amount 0 - 1
  light.intensity = 0.7;
  // Built-in 'sphere' shape.
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    app.scene
  );
  // Move sphere upward 1/2 its height
  sphere.position.y = 1;
  // Move the sphere over
  sphere.position.x = -1.5;
  // Built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, app.scene);

  // Load a mesh
  const result = await SceneLoader.ImportMeshAsync(
    undefined,
    houseUrl,
    undefined,
    app.scene
  );
  // When you import glb or gltf, the first mesh is always "root".
  const rootMesh = result.meshes[0];
  rootMesh.position = new Vector3(1.5, 0, 0);
  // Rotate 90 degree along the Y axis to turn the house towards the camera.
  // This good to know and also I messed up the rotation in Blender.
  rootMesh.rotate(new Vector3(0, 1, 0), Tools.ToRadians(90));
}

async function main() {
  const app = new App();
  await createStarterScene(app);
  app.start();
}

main();
