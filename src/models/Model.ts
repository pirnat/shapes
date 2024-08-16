import { CANVAS_OPTIONS, MAIN_WRAPPER_WIDTH, MAX_WIDTH_ELEMENT } from '../constants/common';
import { ShapeTypesEnum } from '../enums/shape.enum';
import { Application } from 'pixi.js';
import { CircleShape } from './Shapes/CircleShape';
import { EllipseShape } from './Shapes/Ellipse';
import { BasePolygon } from './Shapes/BasePolygon';
import { CustomFigureShape } from './Shapes/CustomFigure';
import { BaseShape } from './Shapes/BaseShape';

export default class Model {
  readonly state = {
    ...CANVAS_OPTIONS
  }

  public changeGravity(isIncrease: boolean): number {
    if (isIncrease) {
      this.state.gravity += 1;
    } else {
      if (this.state.gravity === 1) return 1;
      this.state.gravity -= 1;
    }

    return this.state.gravity;
  }

  public changeShapesPerSecond(isIncrease: boolean): number {
    if (isIncrease) {
      /* 10 - border width and 10 - margin between elements */
      const maxElQuantity = Math.floor((MAIN_WRAPPER_WIDTH - 10) / (MAX_WIDTH_ELEMENT + 10));
      if (maxElQuantity === this.state.shapesPerSecond) {
        return maxElQuantity;
      }

      this.state.shapesPerSecond += 1;
    } else {
      if (this.state.shapesPerSecond === 1) return 1
      this.state.shapesPerSecond -= 1;
    }

    return this.state.shapesPerSecond;
  }

  public createFigure(app: Application, xPos = 0, yPos = 0): BaseShape {
    const figureType = this.selectFigureType();
    switch (figureType) {
      case ShapeTypesEnum.Circle:
        return new CircleShape(app, xPos, yPos);
      case ShapeTypesEnum.Ellipse:
        return new EllipseShape(app, xPos, yPos);
      case ShapeTypesEnum.Three_Sides:
        return new BasePolygon(app, 3, ShapeTypesEnum.Three_Sides, xPos, yPos);
      case ShapeTypesEnum.Four_Sides:
        return new BasePolygon(app, 4, ShapeTypesEnum.Four_Sides, xPos, yPos);
      case ShapeTypesEnum.Five_Sides:
        return new BasePolygon(app, 3, ShapeTypesEnum.Five_Sides, xPos, yPos);
      case ShapeTypesEnum.Six_Sides:
        return new BasePolygon(app, 3, ShapeTypesEnum.Six_Sides, xPos, yPos)
      default:
        return new CustomFigureShape(app);
    }
  }

  private selectFigureType(): string {
    const index = Math.floor(Math.random() * Object.keys(ShapeTypesEnum).length);

    return Object.values(ShapeTypesEnum)[index];
  }
}
