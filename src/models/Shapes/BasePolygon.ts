import { BaseShape } from './BaseShape';
import { Application} from 'pixi.js';
import { randomIntFromInterval } from '../../utils/utils';
import { MAX_WIDTH_ELEMENT, MIN_WIDTH_ELEMENT } from '../../constants/common';
import { ShapeTypesEnum } from '../../enums/shape.enum';

export class BasePolygon extends BaseShape {
  constructor(app: Application, sides: number, shapeType: ShapeTypesEnum, xPos: number = 0, yPos: number = 0) {
    super();
    this.shapeType = shapeType;
    this.createFigure(app, xPos, yPos, sides);
  }

  public createFigure(app: Application, xPos: number, yPos: number, sides: number): void {
    const radius = randomIntFromInterval(MIN_WIDTH_ELEMENT / 2, MAX_WIDTH_ELEMENT / 2);
    this.figure.roundPoly(xPos, yPos, radius, sides, 0, randomIntFromInterval(10, 100) / 100);
    this.surfaceArea = ((sides * Math.pow(radius, 2)) / 2) * (Math.sin((Math.PI * 2) / sides));
    this.setColor();
    this.updateTexture(app);
  }
}
