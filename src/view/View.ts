import { Application, Container, Rectangle } from 'pixi.js';
import {
  INIT_APP_OPTIONS,
  MAIN_WRAPPER_HEIGHT
} from '../constants/common';
import { ShapeTypesEnum } from '../enums/shape.enum';
import { getRandomColor } from '../utils/utils';
import { BaseShape } from '../models/Shapes/BaseShape';
import { ViewIdsEnum } from "../enums/view-ids.enum";

export default class View {
  public app: Application;

  private gravity: number = 0;

  constructor () {
    this.app = new Application();
  }

  public async init(): Promise<void> {
    const appWrapper: HTMLElement | null = document.getElementById(ViewIdsEnum.App_Wrapper) as HTMLElement;
    await this.app.init({
      ...INIT_APP_OPTIONS
    });
    appWrapper.appendChild(this.app.canvas);
    this.app.stage.hitArea = new Rectangle(0, 0, this.app.screen.width, this.app.screen.height);
    this.app.stage.interactive = true;

    this.app.ticker.add(() => {
      this.updatePosition();
    })
  }

  public updateShapesViewQuantity(): void {
    const shapesQuantityInput: HTMLInputElement | null = document.getElementById(ViewIdsEnum.Number_of_Shapes) as HTMLInputElement;

    shapesQuantityInput.value = this.app.stage.children.length.toString();
  }

  public updateShapesViewArea(): void {
    const shapesAreaInput: HTMLInputElement | null = document.getElementById(ViewIdsEnum.Surface_Area_Count) as HTMLInputElement;

    shapesAreaInput.value = this.calculateTotalArea(this.app.stage);
  }

  private calculateTotalArea(canvas: Container): string {
    let surfaceArea = 0;
    (canvas.children as BaseShape[]).forEach(child => {
      if (child.surfaceArea) {
        surfaceArea += child.surfaceArea
      }
    })

    return surfaceArea.toFixed(0)
  }

  public updateGravityView (gravity: number): void {
    const gravityInput: HTMLInputElement | null = document.getElementById(ViewIdsEnum.Gravity_Value) as HTMLInputElement;

    gravityInput.value = gravity.toString();
  }

  public updateShapesPerSecond (value: number): void {
    const shapesInput: HTMLInputElement | null = document.getElementById(ViewIdsEnum.Shapes_Per_Second) as HTMLInputElement;
    shapesInput.value = value.toString();
  }

  public changeFillByType (type: ShapeTypesEnum): void {
    const { children } = this.app.stage;
    if (children.length === 0) return;
    (children as BaseShape[]).forEach(shape => {
      if (shape.shapeType && shape.shapeType === type) {
        shape.tint = getRandomColor()
      }
    })
  }

  public updateGravityValue (gravity: number): void {
    this.gravity = gravity;
  }

  private updatePosition (): void {
    for (let i = 0; i < this.app.stage.children.length; i++) {
      const el = this.app.stage.children[i];
      el.y += this.gravity;
      if (el.y > MAIN_WRAPPER_HEIGHT) {
        el.destroy();
        this.updateShapesViewArea();
        this.updateShapesViewQuantity();
      }
    }
  }
}
