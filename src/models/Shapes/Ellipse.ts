import { BaseShape } from './BaseShape';
import { Application } from 'pixi.js';
import { ShapeTypesEnum } from '../../enums/shape.enum';
import { randomIntFromInterval } from '../../utils/utils';
import { MAX_WIDTH_ELEMENT, MIN_WIDTH_ELEMENT } from '../../constants/common';

export class EllipseShape extends BaseShape {
  constructor (app: Application, xPos: number = 0, yPos: number = 0) {
    super();
    this.shapeType = ShapeTypesEnum.Ellipse;
    this.createFigure(app, xPos, yPos);
  }

  public createFigure(app: Application, xPos: number, yPos: number): void {
    const radiusX = randomIntFromInterval(MIN_WIDTH_ELEMENT / 2, MAX_WIDTH_ELEMENT / 2);
    const radiusY = randomIntFromInterval(MIN_WIDTH_ELEMENT / 2, MAX_WIDTH_ELEMENT / 2);
    this.figure.ellipse(xPos, yPos, radiusX, radiusY);
    this.surfaceArea = Math.PI * radiusX * radiusY;
    this.setColor();
    this.updateTexture(app);
  }
}
