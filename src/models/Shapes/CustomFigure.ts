import { BaseShape } from './BaseShape';
import { Application, Graphics } from 'pixi.js';
import { getRandomColor, randomIntFromInterval } from '../../utils/utils';
import { MAX_WIDTH_ELEMENT, MIN_WIDTH_ELEMENT } from '../../constants/common';
import { ShapeTypesEnum } from '../../enums/shape.enum';

export class CustomFigureShape extends BaseShape {
  constructor (app: Application) {
    super();
    this.shapeType = ShapeTypesEnum.Custom;
    this.createFigure(app);
  }

  public createFigure(app: Application): void {
    this.figure = new Graphics();
    const bgColor = getRandomColor();

    const bRadiusY = MAX_WIDTH_ELEMENT / 3;
    const bRadiusX = randomIntFromInterval(bRadiusY / 1.25, bRadiusY / 1.15);
    const sRadiusY = randomIntFromInterval(12, 15);
    const sRadiusX = 10;

    const firstEllipse = new Graphics();
    firstEllipse.ellipse(0, MIN_WIDTH_ELEMENT / 2, bRadiusX, bRadiusY);
    firstEllipse.fill(bgColor);
    this.figure.addChild(firstEllipse);

    const secondEllipse = new Graphics();
    secondEllipse.ellipse(0, firstEllipse.y - sRadiusY / 4, sRadiusX, sRadiusY);
    secondEllipse.fill(bgColor);
    secondEllipse.rotation = -0.03;
    this.figure.addChild(secondEllipse);

    const thirdEllipse = new Graphics();
    thirdEllipse.ellipse(firstEllipse.width / 2 - 5, MIN_WIDTH_ELEMENT / 2, bRadiusX, bRadiusY);
    thirdEllipse.fill(bgColor);
    this.figure.addChild(thirdEllipse);

    const fourthEllipse = new Graphics();
    fourthEllipse.ellipse(firstEllipse.width / 2 - 5, thirdEllipse.y - sRadiusY / 4, sRadiusX, sRadiusY);
    fourthEllipse.fill(bgColor);
    fourthEllipse.rotation = 0.03;
    this.figure.addChild(fourthEllipse);

    const fifthEllipse = new Graphics();
    fifthEllipse.ellipse(firstEllipse.width / 2 - 5, thirdEllipse.y + thirdEllipse.height - sRadiusY / 5, sRadiusX, sRadiusY);
    fifthEllipse.fill(bgColor);
    fifthEllipse.rotation = -0.03;
    this.figure.addChild(fifthEllipse);

    const sixthEllipse = new Graphics();
    sixthEllipse.ellipse(0, firstEllipse.y + firstEllipse.height - sRadiusY / 5, sRadiusX, sRadiusY);
    sixthEllipse.fill(bgColor);
    sixthEllipse.rotation = 0.03;
    this.figure.addChild(sixthEllipse);
    this.setColor();
    this.updateTexture(app);
    this.calculatePixelsFromTexture(app);
  }

  private calculatePixelsFromTexture(app: Application): void {
    const pixels = app.renderer.extract.pixels(this.texture)
    /* The 4 is the typical number of bytes used to store one pixels with alpha channel. */
    this.surfaceArea = pixels.pixels.reduce((a, b) => {
      if (b) {
        a += pixels.pixels.BYTES_PER_ELEMENT
      }
      return a
    }, 0) / 4
  }
}
