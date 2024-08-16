import View from './view';
import Model from './models';
import Controller from './controller';

function init (): void {
  const view = new View();
  const model = new Model();
  const controller = new Controller(view, model);

  // Init controller
  controller.init();
}

init();
