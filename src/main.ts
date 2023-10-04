import "./style.css";
import * as BABYLON from "@babylonjs/core";

class App {
  readonly canvasElement: HTMLCanvasElement;
  readonly engine: BABYLON.Engine;
  readonly scene: BABYLON.Scene;

  constructor(canvasElementSelector: string = "#app") {
    this.canvasElement = document.querySelector(
      canvasElementSelector
    ) as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvasElement);
    this.scene = new BABYLON.Scene(this.engine);
  }

  start() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

function createStarterScene(app: App) {
  // Creates and positions a free camera
  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    app.scene
  );
  // Targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // Attaches the camera to the canvas
  camera.attachControl(app.canvasElement, true);
  // Creates a light, aiming 0,1,0
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    app.scene
  );
  // Dim the light a small amount 0 - 1
  light.intensity = 0.7;
  // Built-in 'sphere' shape.
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    app.scene
  );
  // Move sphere upward 1/2 its height
  sphere.position.y = 1;
  // Built-in 'ground' shape.
  BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    app.scene
  );
}

const app = new App();
createStarterScene(app);
app.start();
