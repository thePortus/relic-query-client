import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface AmbientLightInfo {
  strength: number,
  color: number,
}

interface LightInfo {
  strength: number,
  color: number,
  x: number,
  y: number,
  z: number
}

@Component({
  selector: 'app-three-d-scene',
  templateUrl: './three-d-scene.component.html',
  styleUrls: ['./three-d-scene.component.scss']
})
export class ThreeDSceneComponent implements AfterViewInit {
  @Input() data: any;

  @ViewChild('canvas', { static: true }) private canvasRef: ElementRef<HTMLCanvasElement>;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private model: any;
  private controls: any;
  private fieldOfView: 1;
  private nearClippingPlane: 0.1;
  private farClippingPlane: 1000;
  private ambientLight!: any;
  ambientLightInfo: AmbientLightInfo = {
    strength: 100,
    color: 0x000000
  };
  private directionalLight!: any;
  directionalLightInfo: LightInfo = {
    strength: 0.4,
    color: 0xffdf04,
    x: -4,
    y: 4,
    z: 0
  };
  private light1!:any;
  private light2!:any;
  private light3!:any;
  private light4!:any;
  light1Info: LightInfo = {
    strength: 0.35,
    color: 0xffffff,
    x: 0,
    y: 200,
    z: 400
  };
  light2Info: LightInfo = {
    strength: 0.35,
    color: 0xffffff,
    x: 500,
    y: 100,
    z: 0
  };
  light3Info: LightInfo = {
    strength: 0.35,
    color: 0xffffff,
    x: 0,
    y: 100,
    z: 500
  };
  light4Info: LightInfo = {
    strength: 0.35,
    color: 0xffffff,
    x: -500,
    y: 300,
    z: 500
  };
  showControls: string = 'None';


  ngAfterViewInit(): void {
    // initiate scene and start render loop
    this.createScene();
    this.startRenderingLoop();
  }

  getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.model = new OBJLoader().parse(this.data);
    let box = new THREE.Box3().setFromObject(this.model);
    box.getCenter(this.model.position);
    this.model.position.multiplyScalar(-1);
    this.scene.add(this.model);
    this.ambientLight = new THREE.AmbientLight(this.ambientLightInfo.color, this.ambientLightInfo.strength);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(this.directionalLightInfo.color, this.directionalLightInfo.strength);
    this.directionalLight.position.set(this.directionalLightInfo.x, this.directionalLightInfo.y, this.directionalLightInfo.z);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(this.light1Info.color, this.light1Info.strength);
    this.light1.position.set(this.light1Info.x, this.light1Info.y, this.light1Info.z);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(this.light2Info.color, this.light2Info.strength);
    this.light2.position.set(this.light2Info.x, this.light2Info.y, this.light2Info.z);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(this.light3Info.color, this.light3Info.strength);
    this.light3.position.set(this.light2Info.x, this.light2Info.y, this.light2Info.z);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(this.light4Info.color, this.light4Info.strength);
    this.light4.position.set(this.light2Info.x, this.light2Info.y, this.light2Info.z);
    this.scene.add(this.light4);
  }

  private startRenderingLoop() {
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), this.nearClippingPlane, this.farClippingPlane);
    this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();

    this.camera.position.z = 5;

    window.addEventListener('resize', () => {
       this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
       this.camera.aspect = this.getAspectRatio();
       this.camera.updateProjectionMatrix();
     });

     let component: ThreeDSceneComponent = this;
     (function render() {
      requestAnimationFrame(render);
      //component.animateModel();
      component.renderer.render(component.scene, component.camera);
     }());
  }

  setDirectionalLightStrength(e: any) {
    this.directionalLightInfo.strength = e.target.value;
    this.scene.remove(this.directionalLight);
    this.directionalLight = new THREE.DirectionalLight(this.directionalLightInfo.color, this.directionalLightInfo.strength);
    this.scene.add(this.directionalLight);
  }

  setLight1Strength(e: any) {
    this.light1Info.strength = e.target.value;
    this.scene.remove(this.light1);
    this.light1 = new THREE.DirectionalLight(this.light1Info.color, this.light1Info.strength);
    this.light1.position.set(this.light1Info.x, this.light1Info.y, this.light1Info.z);
    this.scene.add(this.light1);
  }

  setLight2Strength(e: any) {
    this.light2Info.strength = e.target.value;
    this.scene.remove(this.light2);
    this.light2 = new THREE.DirectionalLight(this.light2Info.color, this.light2Info.strength);
    this.light2.position.set(this.light2Info.x, this.light2Info.y, this.light2Info.z);
    this.scene.add(this.light2);
  }

  setLight3Strength(e: any) {
    this.light3Info.strength = e.target.value;
    this.scene.remove(this.light3);
    this.light3 = new THREE.DirectionalLight(this.light3Info.color, this.light3Info.strength);
    this.light3.position.set(this.light3Info.x, this.light3Info.y, this.light3Info.z);
    this.scene.add(this.light3);
  }

  setLight4Strength(e: any) {
    this.light4Info.strength = e.target.value;
    this.scene.remove(this.light4);
    this.light4 = new THREE.DirectionalLight(this.light4Info.color, this.light4Info.strength);
    this.light4.position.set(this.light4Info.x, this.light4Info.y, this.light4Info.z);
    this.scene.add(this.light4);
  }

  setDirectionalLightPosition() {
    this.scene.remove(this.directionalLight);
    this.directionalLight = new THREE.DirectionalLight(this.directionalLightInfo.color, this.directionalLightInfo.strength);
    this.directionalLight.position.set(this.directionalLightInfo.x, this.directionalLightInfo.y, this.directionalLightInfo.z);
    this.scene.add(this.directionalLight);
  }

  setLight1Position() {
    this.scene.remove(this.light1);
    this.light1 = new THREE.PointLight(this.light1Info.color, this.light1Info.strength);
    this.light1.position.set(this.light1Info.x, this.light1Info.y, this.light1Info.z);
    this.scene.add(this.light1);
  }

  setLight2Position() {
    this.scene.remove(this.light2);
    this.light2 = new THREE.PointLight(this.light2Info.color, this.light2Info.strength);
    this.light2.position.set(this.light1Info.x, this.light1Info.y, this.light1Info.z);
    this.scene.add(this.light1);
  }

  setLight3Position() {
    this.scene.remove(this.light3);
    this.light3 = new THREE.PointLight(this.light3Info.color, this.light3Info.strength);
    this.light3.position.set(this.light3Info.x, this.light3Info.y, this.light3Info.z);
    this.scene.add(this.light1);
  }

  setLight4Position() {
    this.scene.remove(this.light4);
    this.light4 = new THREE.PointLight(this.light4Info.color, this.light4Info.strength);
    this.light4.position.set(this.light4Info.x, this.light4Info.y, this.light4Info.z);
    this.scene.add(this.light4);
  }

}
