class DeleteUser {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async execute(id) {
    const result = await this.userModel.delete(id);
    return result;
  }
}

module.exports = DeleteUser;
