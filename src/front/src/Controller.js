class Controller {
  // constructor() {
  // }

  getList(modelName) {
    if (this[`${modelName}Model`] && this[`${modelName}Model`].getList) {
      return this[`${modelName}Model`].getList();
    }
    throw new Error(`Model ${modelName} doesn't registered`);
  }
}

export default Controller;
