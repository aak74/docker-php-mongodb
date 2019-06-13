class unblocked {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async execute(id) {
    const result = await this.userModel.unblocked(id);
    return result;
  }
}

module.exports = unblocked;
