import { Router } from 'express';
import { EmployeesController } from './controllers/employees.controller';

const employeesController = new EmployeesController();

const route = Router();

route.get('/employees/', employeesController.find);
route.get('/employees/:id', employeesController.findOne);
route.post('/employees/', employeesController.create);
route.put('/employees/:id', employeesController.update);
route.delete('/employees/:id', employeesController.delete);

export { route };
