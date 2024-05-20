import mongoose from 'mongoose';

export const EmployeesSchema = new mongoose.Schema({
  name: String,
  office: String,
  department: String,
  admissionDate: Date,
  createdAt: Date,
});
