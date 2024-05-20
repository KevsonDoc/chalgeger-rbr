import { z } from 'zod';
import { isBefore, isEqual } from 'date-fns';

export const EmployeesZodSchema = z.object({
  name: z.string({
    message: 'Nome é um campo obrigatório',
    required_error: 'Nome é um campo obrigatório',
  }),
  office: z.string({
    message: 'Cargo inválido',
    required_error: 'Cargo é um campo obrigatório',
  }),
  department: z.string({
    message: 'Departamento inválido',
    required_error: 'departamento é um campo obrigatório',
  }),
  admissionDate: z
    .string({
      message: 'Data de admissão inválida',
      required_error: 'Data da admissão é um campo obrigatório',
    })
    .datetime()
    .refine(
      value => isBefore(value, new Date()) ?? isEqual(value, new Date()),
      'Data inválida',
    ),
});

export const EmployeesPartialZodSchema = z.object({
  name: z
    .string({
      message: 'Nome é um campo obrigatório',
      required_error: 'Nome é um campo obrigatório',
    })
    .optional(),
  office: z.string({ message: 'Cargo inválido' }).optional(),
  department: z.string({ message: 'Departamento inválido' }).optional(),
  admissionDate: z
    .date({ message: 'Data de admissão inválida' })
    .max(new Date(), '')
    .optional(),
});
