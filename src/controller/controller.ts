import View from '../view';
import Model from '../models';
import { FederatedPointerEvent, Ticker } from 'pixi.js';
import { getRandomIndexFromArr, randomIntFromInterval } from '../utils/utils';
import { MAX_HEIGHT_ELEMENT, MAX_WIDTH_ELEMENT } from '../constants/common';
import { ShapeTypesEnum } from '../enums/shape.enum';
import { BaseShape } from '../models/Shapes/BaseShape';
import {ViewIdsEnum} from "../enums/view-ids.enum";

export default class Controller {
  private readonly view: View;
  private readonly model: Model;
  private lastEventTimeStamp: number | null = null;

  constructor(view: View, model: Model) {
    this.view = view;
    this.model = model;
  }

  public updateGravity(e: Event, isIncrease = true): void {
    e.preventDefault();

    const value = this.model.changeGravity(isIncrease);
    this.view.updateGravityView(value);
    this.view.updateGravityValue(value);
  }

  public updateShapesPerSecond(e: Event, isIncrease = true): void {
    e.preventDefault();

    const value = this.model.changeShapesPerSecond(isIncrease);

    this.view.updateShapesPerSecond(value);
  }

  public addListeners(): void {
    const gravityDecreaseBtn: HTMLButtonElement | null = document.getElementById(ViewIdsEnum.Gravity_Decrease_Btn) as HTMLButtonElement;
    const gravityIncreaseBtn: HTMLButtonElement | null = document.getElementById(ViewIdsEnum.Gravity_Increase_Btn) as HTMLButtonElement;
    const shapesDecreaseBtn: HTMLButtonElement | null = document.getElementById(ViewIdsEnum.Shapes_Decrease_Btn) as HTMLButtonElement;
    const shapesIncreaseBtn: HTMLButtonElement | null = document.getElementById(ViewIdsEnum.Shapes_Increase_Btn) as HTMLButtonElement;
    const canvas = this.view.app.canvas;

    gravityDecreaseBtn.addEventListener('click', (e: Event) => { this.updateGravity(e, false) });
    gravityIncreaseBtn.addEventListener('click', (e: Event) => { this.updateGravity(e, true) });
    shapesDecreaseBtn.addEventListener('click', (e: Event) => { this.updateShapesPerSecond(e, false) });
    shapesIncreaseBtn.addEventListener('click', (e: Event) => { this.updateShapesPerSecond(e, true) });
    canvas.onpointerdown = (event) => {
      event.stopPropagation();
      if (!this.lastEventTimeStamp) {
        const spr = this.model.createFigure(this.view.app);
        const left = (window.innerWidth - this.view.app.canvas.width) / 2;
        const top = (window.innerHeight - this.view.app.canvas.height) / 2;
        spr.x = event.clientX - left - spr.texture.width / 2;
        spr.y = event.clientY - top - spr.texture.height / 2;
        this.addShape(spr);
      } else {
        this.lastEventTimeStamp = null;
      }
    }
  }

  public spawnShapes(): void {
    const { timeDelay } = this.model.state;
    const ticker = new Ticker();
    ticker.autoStart = true;
    let timer = 0;
    ticker.add((ticker: Ticker) => {
      timer += ticker.elapsedMS;
      if (timeDelay < timer) {
        timer = 0;
        this.createShapes();
      }
    })
  }

  public initValues(): void {
    const { state } = this.model;
    this.view.updateGravityView(state.gravity);
    this.view.updateGravityValue(state.gravity);
    this.view.updateShapesPerSecond(state.shapesPerSecond);
  }

  private addShapeAction(element: BaseShape): void {
    element.onpointerdown = (event: FederatedPointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      this.lastEventTimeStamp = event.timeStamp;
      element.destroy();
      this.view.updateShapesViewQuantity();
      this.view.updateShapesViewArea();
      this.view.changeFillByType(element.shapeType as ShapeTypesEnum);
    }
  }

  private addShape(spr: BaseShape): void {
    this.view.app.stage.addChild(spr);
    this.addShapeAction(spr);
    this.view.updateShapesViewQuantity();
    this.view.updateShapesViewArea();
  }

  private createShapes(): void {
    let startPointsX = this.createStartPointArr();
    for (let i = 0; i < this.model.state.shapesPerSecond; i++) {
      const spr = this.model.createFigure(this.view.app);
      const startPointIndex = getRandomIndexFromArr(startPointsX.length);
      spr.x = startPointsX[startPointIndex];
      startPointsX.splice(startPointIndex, 1);
      if (startPointsX.length === 0) {
        startPointsX = this.createStartPointArr();
      }
      spr.y = randomIntFromInterval(-MAX_HEIGHT_ELEMENT - 10, -1.5 * MAX_HEIGHT_ELEMENT);
      this.addShape(spr);
    }
  }

  private createStartPointArr(): number[] {
    const arr = []
    /* 10 - border width and 10 - margin between elements */
    const len = (this.view.app.canvas.width - 10) / (MAX_WIDTH_ELEMENT + 10);
    const roundLen = Math.floor(len);
    const startPos = randomIntFromInterval(0, Math.floor((this.view.app.canvas.width - (roundLen * MAX_WIDTH_ELEMENT)) / roundLen));
    for (let i = 0; i < roundLen; i++) {
      arr.push(i * (MAX_WIDTH_ELEMENT + 10) + startPos);
    }
    return arr;
  }

  public async init(): Promise<void> {
    const { state } = this.model;
    this.initValues();
    this.view.updateGravityValue(state.gravity);
    await this.view.init();
    this.addListeners();
    this.createShapes();
    this.spawnShapes();
  }
}
