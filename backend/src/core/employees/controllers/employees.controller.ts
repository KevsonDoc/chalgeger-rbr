import { Request, Response } from 'express';
import { EmployeesService } from '../service/employees.service';
import { HttpExeption } from '../../../infra/error/HttpExeption';

const employeesService = new EmployeesService();

export class EmployeesController {
  public async find(request: Request, response: Response) {
    const { page, limit } = request.query;
    const employees = await employeesService.find(
      Number(page) ?? 1,
      Number(limit),
    );

    return response.json(employees).status(200);
  }

  public async findOne(request: Request, response: Response) {
    const id = request.params.id;

    if (!id) {
      throw new HttpExeption(['Funcionário não encontrado'], 404);
    }

    const employeesService = new EmployeesService();

    const employees = await employeesService.findOne(id);

    return response.json(employees).status(200);
  }

  public async create(request: Request, response: Response) {
    const payload = request.body;
    const employeesService = new EmployeesService();
    const employees = await employeesService.create(payload);
    return response.json(employees).status(2000);
  }

  public async update(request: Request, response: Response) {
    const id = request.params.id;
    const payload = request.body;
    const employeesService = new EmployeesService();
    await employeesService.update(id, payload);
    return response
      .json({ message: ['Funcionário atualizado com sucesso'] })
      .status(2000);
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    if (!id) {
      throw new HttpExeption(['Funcionário não encontrado'], 404);
    }

    const employeesService = new EmployeesService();

    await employeesService.delete(id);

    return response
      .json({
        message: ['Funcionário foi deletado.'],
      })
      .status(200);
  }
}
