import express = require('express');
import bodyParser = require('body-parser');
import Controller = require('./interfaces/controller.interface');


class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Array<Controller>, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended : true}))
  }
 
  private initializeControllers(controllers: Array<Controller>) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      // console.log(`http://localhost:${this.port}`);
    });
  }
}
 
export default App;