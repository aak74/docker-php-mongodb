
const lodash = require('lodash');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = require('../auth/authorize');

const verifyKey = auth.verifyKey;
const isAdmin = function(name){
  if (name==='admin'){
    return true
  }
  return false
} 


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

    this.httpServer.get('/users',passport.authenticate('jwt', { session: false }), async (req, res) => {
      if(isAdmin(req.user.login)){
        const result = await this.userController.usersGet(req.body);
        res.send(result);
      }else{
        res.send({ message: 'Sorry this is private page'});
      } 
    });

    this.httpServer.post('/user/register', bodyParser.json(), async (req, res) => {
      const result = await this.userController.register(req.body);
      res.send({ status: result.login });
    });

    this.httpServer.delete('/user/:id',passport.authenticate('jwt', { session: false }), bodyParser.json(), async (req, res) => {
      if (isAdmin(req.user.login)){
        const result = await this.userController.delete({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });

    const self = this;
    this.httpServer.use('/status', (_, res) => {
      res.status(200).send('OK');
    });

    this.httpServer.get('/projects',passport.authenticate('jwt', { session: false }), async (req, res) => {
      const data = await this.projectController.getList(req.user.id);
      res.send({
        status: 'ok',
        data,

      });
    });
    
    this.httpServer.get('/projects/:id',passport.authenticate('jwt', { session: false }), async (req, res) => {
      const data = await this.projectController.get({
        _id:req.params.id,
        id:req.user.id
      });
      const History = await this.historyController.getHistory({
        id:req.params.id
      });
      data.history = History.history;
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

    this.httpServer.get('/projects/:id/backup',passport.authenticate('jwt', { session: false }), async (req, res) => {
      const data = {
        _id:req.params.id,
        id:req.user.id
      };
      console.log("Data=>",data);
      const result = await this.projectController.backup(data);
      res.send({result});
    });

    this.httpServer.post('/projects/:id/status', bodyParser.json(), async (req, res) => {
      const result = await this.historyController.sendHistory(req.body);
      const resultUpdate = await this.projectController.updateStatus(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/projects/users', bodyParser.json(), async (req, res) => {
      const result = await this.historyController.sendHistory(req.body);
      const resultUpdate = await this.projectController.updateStatus(req.body);
      res.send({ status: 'ok' });
    });

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
