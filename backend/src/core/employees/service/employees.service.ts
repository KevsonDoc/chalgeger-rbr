import mongoose, { Model } from 'mongoose';
import { ZodError } from 'zod';
import { HttpExeption } from '../../../infra/error/HttpExeption';
import { logger } from '../../../infra/logger';
import { EmployeesSchema } from '../entity/employees.entity';
import {
  EmployeesPartialZodSchema,
  EmployeesZodSchema,
} from '../serialization';
import {
  EmployeesModel,
  IEmployeerResponse,
  IEmployeerServiceContract,
} from './employees-service.interface';

export class EmployeesService implements IEmployeerServiceContract {
  private EmployeesModel: Model<EmployeesModel>;

  constructor() {
    this.EmployeesModel = mongoose.connection.model<EmployeesModel>(
      'Employees',
      EmployeesSchema,
    );
  }

  public async create(
    payload: Omit<EmployeesModel, '_id'>,
  ): Promise<EmployeesModel> {
    try {
      const employeesValidated = EmployeesZodSchema.parse(payload);
      const employees = new this.EmployeesModel(employeesValidated);
      return employees.save();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        throw new HttpExeption(
          error.errors.map(({ message }) => message),
          422,
        );
      }

      logger.error(error);
      throw new HttpExeption(['Error ao criar funcionário'], 500);
    }
  }

  public async find(page = 0, limit = 10): Promise<IEmployeerResponse> {
    const employees = await this.EmployeesModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const employeesCount = await this.EmployeesModel.countDocuments(); // Total documents in the Posts collection
    const totalPages = Math.ceil(employeesCount / limit);

    return {
      page,
      limit,
      totalPages,
      totalInPage: employees.length,
      employees,
    };
  }

  public async findOne(id: string): Promise<EmployeesModel | null> {
    const employees = this.EmployeesModel.findOne({ _id: id }).exec();

    return employees;
  }

  public async update(
    id: string,
    payload: Partial<EmployeesModel>,
  ): Promise<void> {
    try {
      const employeesValidated = EmployeesPartialZodSchema.parse(payload);
      await this.EmployeesModel.findOneAndUpdate(
        { _id: id },
        employeesValidated,
      );
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpExeption(
          error.errors.map(({ message }) => message),
          422,
        );
      }

      logger.error(error);
      throw new HttpExeption(['Error ao atualizar funcionário'], 500);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.EmployeesModel.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error);
      throw new HttpExeption(['Error ao deletar funcionário'], 500);
    }
  }
}
