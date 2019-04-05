const Admins = [
  '5c87a19084ddc510b92b87c3',
];
const security = 'ArealIdea'
const isAdmin = function(id){
  return true;
  // id=''+id;
  console.log(id,Admins[0]);
  if (Admins.indexOf(id)!=-1){
    return true
  }
  return false
} 

var auth1 = null;

const authMiddleware = (req, res, next) => {
  // return true;
  // console.log('authMiddleware', Router);

  auth1.auth();
  next();
};


class Router {
  constructor({
    logger,
    httpServer,
    config,
    projectController,
    userController,
    historyController,
    socketIO,
    auth,
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
    auth1 = auth;
    // this.passport = passport;

    this.bodyParser = bodyParser;
  }


  getToken(user) {
    return this.auth.getToken({
      id: user._id,
      login: user.login,
      date: Date.now(),
      blocked: user.blocked,
    });
  }

  getRefreshToken(user, token) {
    return this.auth.getRefreshToken({
      login: user.login,
      tokenToReftesh: token,
    });
  }

  async run() {
    const self = this;
    const isBlocked =  async function (req,res,next){
      const params = {
        login:req.user.login,
        blocked:true,
      };
      const result = await self.userController.login(params);
      if (result){
        res.status(401).json({ message: 'you are blocked' });
        return
      }
      next();
    };

    const route = this.httpServer.use(authMiddleware, this.bodyParser.json());
    // const route = this.httpServer.route('/', authMiddleware, this.bodyParser.json());

    // this.httpServer.all('/', function(_, res) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // });

    this.httpServer.post('user/login', async (req, res) => {
      const user = await this.userController.login(req.body);
      if (!user) {
        console.log(user, 'notlogin');
        res.status(401).json({ message: 'User not found' });
      }
      
      if (user.password !== req.body.password) {
        res.status(401).json({ message: 'passwords did not match' });
        return;
      }

      const token = this.getToken(user);
      const refreshToken = this.getRefreshToken(user, token);
      res.json({ 
        message: 'ok', 
        name: user.login , 
        token, 
        refreshToken 
      });
    });

    this.httpServer.get('users', async (req, res) => {
      if(isAdmin(req.user.id)){
        const result = await this.userController.usersGet(req.body);
        res.send(result);
      }else{
        res.send({ message: 'Sorry this is private page'});
      } 
    });

    this.httpServer.get('/isAdmin', async (req, res) => {
      res.send({isAdmin: true});
      return;

      if(isAdmin(req.user.id)){
        res.send({isAdmin: true});
      }else{
        res.send({isAdmin: false});
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

    this.httpServer.post('user/register', async (req, res) => {
      const result = await this.userController.register(req.body);
      console.log(result.login);
      res.send({ status: result.login });
    });

    this.httpServer.delete('user/:id', async (req, res) => {
      if (isAdmin(req.user.id)){
        const result = await this.userController.delete({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });

    this.httpServer.delete('/block/user/:id', async (req, res) => {
      if (isAdmin(req.user.id)){
        const result = await this.userController.block({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });

    this.httpServer.delete('/unblock/user/:id', async (req, res) => {
      if (isAdmin(req.user.id)){
        const result = await this.userController.unblock({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });

    this.httpServer.use('/status', (_, res) => {
      res.status(200).send('OK');
    });

    this.httpServer.get('/projects', async (req, res) => {
      const data = await this.projectController.getList(req.user.id);
      res.send({
        status: 'ok',
        data,
      });
    });

    this.httpServer.post('/refreshToken', async (req, res) => {
      console.log('refreshToken', req.user);
      
      if (req.user.tokenToReftesh === req.body.token){
        const self = this;

        const params = {
          login: req.user.login,
        };
        const user = await self.userController.login(params);
        if (user.blocked) {
          res.json({ message: 'blocked', name: user.login, token, refreshToken });
          return;
        }

        const token = this.getToken(user);
        const refreshToken = this.getRefreshToken(user, token);

        res.json({ message: 'ok', name: user.login , token, refreshToken });
        return;
      }
      res.send({ status: 'failed' });
    });
    
    this.httpServer.get('/projects/:id', async (req, res) => {
    // this.httpServer.get('/projects/:id', async (req, res) => {
      console.log('projects/id', req.params, req.user);
      
      const data = await this.projectController.get({
        _id: req.params.id,
        userId: req.user.id
      });

      const History = await this.historyController.getHistory({
        id: req.params.id
      });
      data.history = History.history;
      data.backup= History.historyBackup;
      res.send({
        status: 'ok',
        data,
      });
    });

    this.httpServer.get('/historyprojects/:key', async (req, res) => {
      if (req.params.key != security){
        res.send({message: 'private page'});
        return
      }
      const data = await this.projectController.getList();
      res.send({
        status: 'ok',
        data,

      });
    });

    this.httpServer.post('/projects/:id', async (req, res) => {
      const _ = await this.projectController.update({
        _id: req.params.id,
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete(
      '/projects/:id', 
      async (req, res) => {
        
        const result = await this.projectController.delete({
          _id: req.params.id,
          // password: req.body.password,
        });
        
        console.log('delete', result);
        if (result){
          // this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект '+req.body.name+' успешно удален'}); 
          res.send({ status: 'ok' });
          return;
        }
        // this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект '+req.body.name+' не удален'});
        res.send({ status: 'error' });

      }
    );

    this.httpServer.post('/projects', async (req, res) => {
      this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект '+req.body.name+' успешно создан'});
      const dataProject= req.body;
      dataProject.id=req.user.id;
      const _ = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    // this.httpServer.post('/backup/:id/Queue/:user/:ProjectName/:key', async (req, res) => {
    //   if (req.params.key != security){
    //     res.send({message: 'private page'});
    //     return
    //   }
    //   console.log(req.params.key)
    //   const data={
    //     '_id': req.params.id,
    //     time: new Date(),
    //   };
    //   const resultUpdate = await this.historyController.sendHistory(data);
    //   //const resultUpdate = await this.projectController.updateStatus(data);
    //   this.io.sockets.in(req.params.user).emit('message', {msg: 'Бекап проекта '+req.params.ProjectName+' успешно завершен'});
    //   return true
    // });

    this.httpServer.get(
      '/projects/:id/backup',
      authMiddleware, 
      async (req, res) => {
        this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект поставлен на бэкап'});
        try {
          const result = await this.projectController.backup({
            _id: req.params.id,
            userId: req.user.id,
          });
          if (result) {
            res.send({ status: 'ok' });
            return;
          }
          res.send({ status: 'error', message: 'Unknown Error' });
        } catch (error) {
          res.send({ status: 'error', message: error.message });
        }
      }
    );

    // this.httpServer.post('/projects/:id/status/:key', async (req, res) => {
    //   if (req.params.key != security){
    //     res.send({message: 'private page'});
    //     return
    //   }
    //   const result = await this.historyController.sendHistory(req.body);
    //   const resultUpdate = await this.projectController.updateStatus(req.body);
    //   res.send({ status: 'ok' });
    // });

    // this.httpServer.get('/projects/users' , async (req, res) => {
    //   const result = await this.historyController.sendHistory(req.body);
    //   const resultUpdate = await this.projectController.updateStatus(req.body);
    //   res.send({ status: 'ok' });
    // });

    this.http.listen(this.config.port, (err) => {
      if (err) {
        self.logger.error('Server error', err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    });
  }
}

module.exports = Router;
