import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_of_joining: string;

  @Column()
  last_salary: number;
}
