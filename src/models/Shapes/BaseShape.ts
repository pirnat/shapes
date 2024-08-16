import { Application, Graphics, Sprite } from 'pixi.js';
import { ShapeTypesEnum } from '../../enums/shape.enum';
import { getRandomColor } from '../../utils/utils';

export class BaseShape extends Sprite {
  public figure!: Graphics;
  public surfaceArea!: number;
  public shapeType!: ShapeTypesEnum | null;

  constructor() {
    super();
    this.interactive = true;
    this.shapeType = null;
    this.figure = new Graphics();
  }

  public setColor(): void {
    const bgColor = getRandomColor();
    this.figure.fill(bgColor);
  }

  public updateTexture(app: Application): void {
    this.texture = app.renderer.generateTexture(this.figure);
  }

  public createFigure(app?: Application, xPos?: number, yPos?: number, sides?: number): void {}
}
