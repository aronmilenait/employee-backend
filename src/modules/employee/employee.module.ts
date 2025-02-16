import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './infrastructure/persistence/entities/employee.entity';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './application/service/employee.service';
import { EmployeeRepository } from './infrastructure/persistence/employee.mysql.repository';
import { EMPLOYEE_REPOSITORY } from './application/repository/employee.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    {
      useClass: EmployeeRepository,
      provide: EMPLOYEE_REPOSITORY,
    },
  ],
})
export class EmployeeModule {}
