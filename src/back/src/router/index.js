const jwt = require('jsonwebtoken');

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
    socketIO,
    auth,
    passport,
    bodyParser,
    http,
  }) {
    this.logger = logger;
    this.httpServer = httpServer;
    this.config = config;
    this.projectController = projectController;
    this.userController = userController;
    this.historyController = historyController;
    this.http = http;
    this.io = socketIO;
    this.auth = auth;
    this.passport = passport;
    this.bodyParser = bodyParser;
  }


  async run() {
    this.httpServer.all('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
    });

    this.httpServer.post('/user/login', async (req, res) => {
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
          verifyKey: this.auth.verifyKey,
        };
        const token = jwt.sign(payload, this.auth.jwtOptions.secretOrKey);
        res.json({ message: 'ok', name: user.login ,token });
      } else {
        console.log(user, 'notpassword');
        res.status(401).json({ message: 'passwords did not match' });
      }
    });

    this.httpServer.get('/users', this.passport.authenticate('jwt', { session: false }), async (req, res) => {
      if(isAdmin(req.user.login)){
        const result = await this.userController.usersGet(req.body);
        res.send(result);
      }else{
        res.send({ message: 'Sorry this is private page'});
      } 
    });

    this.io.sockets.on('connection',function (socket) {
      socket.on('autorized', function (user) {
        socket.user=user.user;
        socket.join(socket.user);
      });
      socket.on('message', function (msg) {
      });

      socket.on('disconnect', function () {
      });
    });

    this.httpServer.post('/user/register', this.bodyParser.json(), async (req, res) => {
      const result = await this.userController.register(req.body);
      res.send({ status: result.login });
    });

    this.httpServer.delete('/user/:id',this.passport.authenticate('jwt', { session: false }), this.bodyParser.json(), async (req, res) => {
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

    this.httpServer.get('/projects',this.passport.authenticate('jwt', { session: false }), async (req, res) => {
      
      const data = await this.projectController.getList(req.user.id);
      res.send({
        status: 'ok',
        data,

      });
    });
    
    this.httpServer.get('/projects/:id',this.passport.authenticate('jwt', { session: false }), async (req, res) => {
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
      res.send({
        status: 'ok',
        data,

      });
    });

    this.httpServer.post('/projects/:id', this.bodyParser.json(), async (req, res) => {
      const _ = await this.projectController.update({
        _id: req.params.id,
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/projects/:id', this.bodyParser.json(), async (req, res) => {
      const _ = await this.projectController.delete({
        _id: req.params.id,
        password: req.body.password,
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects', this.bodyParser.json(),this.passport.authenticate('jwt', { session: false }), async (req, res) => {
      const dataProject= req.body;
      dataProject.id=req.user.id;
      const _ = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/projects/:id/backup',this.passport.authenticate('jwt', { session: false }), async (req, res) => {
      this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект поставлен на бэкап'});
      const data = {
        _id:req.params.id,
        id:req.user.id,    
      };
      const result = await this.projectController.backup(data);
      res.send({result});
    });

    this.httpServer.post('/projects/:id/status', this.bodyParser.json(), async (req, res) => {
      const result = await this.historyController.sendHistory(req.body);
      const resultUpdate = await this.projectController.updateStatus(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/projects/users', this.bodyParser.json(), async (req, res) => {
      const result = await this.historyController.sendHistory(req.body);
      const resultUpdate = await this.projectController.updateStatus(req.body);
      res.send({ status: 'ok' });
    });

    this.http.listen(this.config.port, '0.0.0.0', (err) => {
      if (err) {
        self.logger.error('Server error', err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    });

    // this.http.listen(3001, (err) => {
    //   if (err) {
    //     self.logger.error('Server error', err);
    //     return;
    //   }
    //   self.logger.info(`Server is listening on 3001`);
    // });
  }
}

module.exports = Routes;
