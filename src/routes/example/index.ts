import { Router } from 'express';
import { sayHello } from './hello';

const exampleRouter = Router();

exampleRouter.get('/', sayHello);

export { exampleRouter };
