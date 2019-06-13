class blocked {
  constructor({ userModel  }) {
    this.userModel = userModel;
  }

  async execute(id) {
    const result = await this.userModel.blocked(id);
    return result;
  }
}

module.exports = blocked;
