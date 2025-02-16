import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { Employee } from '../../domain/employee.domain';
import {
  IEmployeeRepository,
  IQueryOptions,
} from '../../application/repository/employee.repository.interface';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async getAll(
    query: IQueryOptions,
  ): Promise<{
    employees: Employee[];
    totalEmployees: number;
    totalPages: number;
  }> {
    const { page, limit } = query;

    const options: FindManyOptions<EmployeeEntity> = {
      skip: (page - 1) * limit,
      take: limit,
    };

    const [employees, totalEmployees] =
      await this.employeeRepository.findAndCount(options);

    return {
      employees,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
    };
  }
}
