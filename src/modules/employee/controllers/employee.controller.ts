import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { EmployeeService } from '../application/service/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (!page || !limit) {
      throw new BadRequestException('page and limit are required');
    }

    return await this.employeeService.getAllEmployees({ page, limit });
  }
}
