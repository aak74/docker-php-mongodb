

const lodash = require('lodash');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');


/* const users = [{
  id: 1,
  name: 'admin',
  password: 'admin',
}]; */


const auth = require('../auth/authorize');

const verifyKey = auth.verifyKey;

class Routes {
  constructor({
    logger,
    httpServer,
    config,
    projectController,
    userController,
    historyController,
  }) {
    this.logger = logger;
    this.httpServer = httpServer;
    this.config = config;
    this.projectController = projectController;
    this.userController = userController;
    this.historyController = historyController;
  }


  async run() {
    passport.use(auth);
    this.httpServer.use(passport.initialize());
    this.httpServer.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.httpServer.use(bodyParser.json());
    function userAuth(id) {
      console.log(id);
    }


    this.httpServer.post('/user/login', async (req, res) => {
      if (req.body.login && req.body.password) {
        const login = req.body.login;
        const password = req.body.password;
      }
      const user = await this.userController.login(req.body);
      if (!user) {
        console.log(user, 'notlogin');
        res.status(401).json({ message: 'no such user found' });
      }
      if (user.password === req.body.password) {
        const payload = 
        { id: user._id,
          login: user.login,
          password: user.password,
          verifyKey: verifyKey,    
        };
        const token = jwt.sign(payload, auth.jwtOptions.secretOrKey);
        res.json({ message: 'ok', name: user.login ,token });
      } else {
        console.log(user, 'notpassword');
        res.status(401).json({ message: 'passwords did not match' });
      }
    });

    /*
    this.httpServer.post('/user/login', bodyParser.json(), async (req, res) => {
      const result = await this.userController.login(req.body);

      res.send({ status: 'ok', result });
    });
*/
  

    this.httpServer.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => {
      //console.log('пользователь', req.user.login);
      res.send({ message: 'Success! You can not see this without a token' });
    });
    this.httpServer.post('/user/register', bodyParser.json(), async (req, res) => {
      const result = await this.userController.register(req.body);
      res.send({ status: 'ok', result });
    });

    const self = this;
    this.httpServer.use('/status', (_, res) => {
      res.status(200).send('OK');
    });

    this.httpServer.get('/projects/:id',passport.authenticate('jwt', { session: false }), async (req, res) => {
     // console.log('пользователь', req.user.id);
      const data = await this.projectController.get({
//        _id: req.params.id,
        id:req.user.id
      });
      res.send({
        status: 'ok',
        data,
      });
    });

    this.httpServer.get('/projects',passport.authenticate('jwt', { session: false }), async (req, res) => {
      const data = await this.projectController.getList(req.user.id);
      res.send({
        status: 'ok',
        data,

      });
    });
    this.httpServer.get('/historyprojects', async (req, res) => {
      const data = await this.projectController.getList();
      //console.log('data',data);
      res.send({
        status: 'ok',
        data,

      });
    });

    this.httpServer.post('/projects/:id', bodyParser.json(), async (req, res) => {
      const _ = await this.projectController.update({
        _id: req.params.id,
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/projects/:id', bodyParser.json(), async (req, res) => {
      const _ = await this.projectController.delete({
        _id: req.params.id,
        password: req.body.password,
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects', bodyParser.json(),passport.authenticate('jwt', { session: false }), async (req, res) => {
      const dataProject= req.body;
      dataProject.id=req.user.id;
      const _ = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/projects/:id/backup', async (req, res) => {
      const _ = await this.projectController.backup(req.params.id);
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects/:id/status', bodyParser.json(), async (req, res) => {
       //console.log('update status', req.params, req.body);

      const result = await this.historyController.sendHistory(req.body);
       //console.log('result',result);
      res.send({ status: 'ok' });
    });

    // this.httpServer.get('/server-status/', async (_, res) =>{
    //   self.logger.debug('server-status');
    //   const result = await this.projectController.getPage({name: 'arealidea'});
    //   res.send(result);
    // });

    this.httpServer.all('*', (req, res) => {
      self.logger.error('Bad request', req.params);
      console.log('bad');
      res.status(400).send('Bad request');
    });

    this.httpServer.listen(this.config.port, (err) => {
      if (err) {
        self.logger.error('Server error', err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    });
  }
}

module.exports = Routes;
