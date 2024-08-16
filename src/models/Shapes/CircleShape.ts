import { BaseShape } from './BaseShape';
import { ShapeTypesEnum } from '../../enums/shape.enum';
import { randomIntFromInterval } from '../../utils/utils';
import { MAX_WIDTH_ELEMENT, MIN_WIDTH_ELEMENT } from '../../constants/common';
import { Application } from 'pixi.js';

export class CircleShape extends BaseShape {
  constructor(app: Application, xPos: number = 0, yPos: number = 0) {
    super();
    this.shapeType = ShapeTypesEnum.Circle;
    this.createFigure(app, xPos, yPos);
  }

  public createFigure(app: Application, xPos: number = 0, yPos: number = 0): void {
    const radius = randomIntFromInterval(MIN_WIDTH_ELEMENT / 2, MAX_WIDTH_ELEMENT / 2);
    this.figure.circle(xPos, yPos, radius);
    this.surfaceArea = Math.PI * Math.pow(radius, 2);
    this.setColor();
    this.updateTexture(app);
  }
}
