import App from './app';
import LambdaController from './controllers/lambda.controller';

const app = new App(
  [
  	new LambdaController()
  ],
  5000,
);
 
app.listen();