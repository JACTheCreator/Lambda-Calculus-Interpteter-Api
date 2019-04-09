import * as express from 'express';
import Controller  from '../interfaces/controller.interface'
import Lambda from '../models/lambda.model'

class LambdaController implements Controller{
  public path: string = '/';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.post(this.path, this.onPostHandler);
    this.router.get(this.path, this.onGetHandler);
  }
 
  onPostHandler = (request: express.Request, response: express.Response) => {
    let equation = request.body.equation;

    let lambda = new Lambda(equation);

    lambda.getAnswer().then(answer=> {
      response.send(answer);
    }).catch(err => {
      response.send(err);
    });
  }

  onGetHandler = (request: express.Request, response: express.Response) => {
    response.send('Page is working')
  }
}
 
export default LambdaController;