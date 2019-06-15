const Router = require('./Router');

class ServiceRouter extends Router {
  constructor({ projectController }) {
    super(projectController);
  }

  route(router) {
    router.get('/projects', async (req, res) => {
      // console.log('ServiceRouter/projects', req);
      try {
        const data = await this.get('getProjects');
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });
  }
}

module.exports = ServiceRouter;
