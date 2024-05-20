import { Types } from 'mongoose';

export interface EmployeesModel {
  _id: Types.ObjectId;
  name: string;
  office: string;
  department: string;
  admissionDate: Date;
  createdAt: Date;
}

export interface IEmployeerResponse {
  page: number;
  limit: number;
  totalInPage: number;
  totalPages: number;
  employees: EmployeesModel[];
}

export interface IEmployeerServiceContract {
  create(payload: Omit<EmployeesModel, '_id'>): Promise<EmployeesModel>;
  update(id: string, payload: EmployeesModel): Promise<void>;
  delete(id: string): Promise<void>;
  find(): Promise<IEmployeerResponse>;
  findOne(id: string): Promise<EmployeesModel | null>;
}
