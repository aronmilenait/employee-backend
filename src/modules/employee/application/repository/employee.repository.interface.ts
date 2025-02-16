import { Employee } from '../../domain/employee.domain';
export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY';

export interface IQueryOptions {
  page: number;
  limit: number;
}

export interface IEmployeeRepository {
  getAll(query: IQueryOptions): Promise<{
    employees: Employee[];
    totalEmployees: number;
    totalPages: number;
  }>;
}
