const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
const bodyParser = require('body-parser');

// var httpServer = ;

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

var Auth = null;

const authMiddleware = (req, res, next) => {
  Auth.auth(req, res, next);
};

class Router {
  constructor({
    logger,
    config,
    projectController,
    userController,
    historyController,
    auth,
  }) {
    this.logger = logger;
    this.config = config;
    this.projectController = projectController;
    this.userController = userController;
    this.historyController = historyController;

    this.app = express();
    this.auth = auth;
    Auth = auth;
  }


  getToken(user) {
    return this.auth.getToken(user);
  }

  getRefreshToken(user) {
    return this.auth.getRefreshToken(user);
  }

  getTokensAndUser(user) {
    return {
      token: this.getToken(user),
      refreshToken: this.getRefreshToken(user),
      user,
    };
  }

  async run() {
    const self = this;
    /*
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
*/
    // this.app.all('/', function(_, res) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // });


    this.app.post('/auth/login', bodyParser.json(), async (req, res) => {
      // console.log('/auth/login', req.body);
      if (!req.body.login || !req.body.password) {
        res.status(400).json({ status: 'error', message: 'Empty login or password'});
        return;
      }

      const user = await this.userController.checkCredentials({
        login: req.body.login,
        password: req.body.password
      });
      
      if (!user) {
        res.status(404).json({ status: 'error', message: 'Login or password not found' });
        return;
      }

      res.status(200).json({ 
        status: 'ok',
        data: this.getTokensAndUser(user)
      });
    });

    this.app.get('/auth/checkToken', authMiddleware, async (req, res) => {
      res.status(200).json({ status: 'ok' , data: req.user });
    });

    this.app.post('/auth/refreshToken', authMiddleware, async (req, res) => {
    // this.app.post('/auth/refreshToken', async (req, res) => {
      this.logger.debug('refreshToken', req.user);
      if (!req.user) {
        res.json({ message: 'User not found' });
        return;
      }

      res.status(200).json({ 
        status: 'ok',
        data: this.getTokensAndUser(req.user)
      });
    });
    
    this.app.get('/users', async (req, res) => {
      res.send('1');
      return;
      if(isAdmin(req.user.id)){
        const result = await this.userController.usersGet(req.body);
        res.send(result);
      }else{
        res.send({ message: 'Sorry this is private page'});
      } 
    });

    this.app.get('/isAdmin', async (req, res) => {
      res.send({ isAdmin: true });
      return;

      if(isAdmin(req.user.id)){
        res.send({ isAdmin: true });
      }else{
        res.send({ isAdmin: false });
      } 
    });

    this.app.post('/user/register', bodyParser.json(), async (req, res) => {
      const result = await this.userController.register(req.body);
      res.send({ status: 'ok', data: result.login });
    });

    this.app.delete('user/:id', async (req, res) => {
      if (isAdmin(req.user.id)){
        const result = await this.userController.delete({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });

    this.app.delete('/block/user/:id', async (req, res) => {
      if (isAdmin(req.user.id)){
        const result = await this.userController.block({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });

    this.app.delete('/unblock/user/:id', async (req, res) => {
      if (isAdmin(req.user.id)){
        const result = await this.userController.unblock({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id});
      }else{
        res.send({ status: 'fail', id: req.params.id});
      }
    });


    this.app.get('/projects', authMiddleware, async (req, res) => {
      // this.logger.debug('/projects', req.user);
      if (!req.user.id) {
        res.status(404).send({ status: 'ok', data: [] });
        return;
      }
      let data;
      try {
        data = await this.projectController.getList(req.user.id);
      } catch (err) {
        this.logger.error('err', err)
        res.status(500).send({ status: 'error' });
        return;
      }
      res.send({
        status: 'ok',
        data,
      });
    });
    
    this.app.get('/projects/:id', async (req, res) => {
    // this.app.get('/projects/:id', async (req, res) => {
      // console.log('projects/id', req.params, req.user);
      
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

    this.app.get('/historyprojects/:key', async (req, res) => {
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

    this.app.post('/projects/:id', async (req, res) => {
      // console.log(`post /projects/${req.params.id}`);
      
      const _ = await this.projectController.update({
        _id: req.params.id,
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.app.delete(
      '/projects/:id', 
      async (req, res) => {
        const result = await this.projectController.delete({
          _id: req.params.id,
          // password: req.body.password,
        });
        
        // console.log('delete', result);
        if (result){
          // this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект '+req.body.name+' успешно удален'}); 
          res.send({ status: 'ok' });
          return;
        }
        // this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект '+req.body.name+' не удален'});
        res.send({ status: 'error' });

      }
    );

    this.app.post('/projects', authMiddleware, bodyParser.json(), async (req, res) => {
      // this.io.sockets.in(req.user.login).emit('message', {msg: 'Проект '+req.body.name+' успешно создан'});
      const dataProject = req.body;
      dataProject.id = req.user.id;
      const _ = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    // this.app.post('/backup/:id/Queue/:user/:ProjectName/:key', async (req, res) => {
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

    this.app.get(
      '/projects/:id/backup',
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

    // this.app.post('/projects/:id/status/:key', async (req, res) => {
    //   if (req.params.key != security){
    //     res.send({message: 'private page'});
    //     return
    //   }
    //   const result = await this.historyController.sendHistory(req.body);
    //   const resultUpdate = await this.projectController.updateStatus(req.body);
    //   res.send({ status: 'ok' });
    // });

    // this.app.get('/projects/users' , async (req, res) => {
    //   const result = await this.historyController.sendHistory(req.body);
    //   const resultUpdate = await this.projectController.updateStatus(req.body);
    //   res.send({ status: 'ok' });
    // });

    this.app.listen(this.config.port, (err) => {
      if (err) {
        self.logger.error('Server error', err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    });

    // this.app.get('/status', (_, res) => {
    //   console.log('status', _);
      
    //   res.status(200).send('OK');
    // });

    // this.io.sockets.on('connection',function (socket) {
    //   socket.on('autorized', function (user) {
    //     socket.user=user.user;
    //     socket.join(socket.user);
    //   });
    //   socket.on('message', function (msg) {
    //   });

    //   socket.on('disconnect', function () {
    //   });
    // });
  }
}

module.exports = Router;
