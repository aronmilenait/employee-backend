import { Inject, Injectable } from '@nestjs/common';
import {
  EMPLOYEE_REPOSITORY,
  IEmployeeRepository,
  IQueryOptions,
} from '../repository/employee.repository.interface';
import { Employee } from '../../domain/employee.domain';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async getAllEmployees(query: IQueryOptions): Promise<{
    employees: Employee[];
    totalEmployees: number;
    totalPages: number;
  }> {
    return await this.employeeRepository.getAll(query);
  }
}
