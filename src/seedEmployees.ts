import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { join } from 'path';
require('dotenv').config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    join(
      __dirname,
      '../modules/**/infrastructure/persistence/entities/*.entity.ts',
    ),
  ],
  synchronize: false,
});

async function seed() {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  const employeeCount = await queryRunner.query(
    `SELECT COUNT(*) FROM employee`,
  );

  if (employeeCount[0]['COUNT(*)'] > 0) {
    console.log('Database is not empty, skipping seed.');
    await queryRunner.release();
    await dataSource.destroy();
    return;
  }

  console.log('🌱 Seeding employees...');
  for (let i = 0; i < 1000; i++) {
    await queryRunner.query(
      `INSERT INTO employee (first_name, last_name, date_of_joining, last_salary) VALUES (?, ?, ?, ?)`,
      [
        faker.person.firstName(),
        faker.person.lastName(),
        faker.date.past({ years: 10 }).toISOString().split('T')[0],
        faker.number.int({ min: 30000, max: 150000 }),
      ],
    );
    console.log('🌱 Seeded employee', i + 1);
  }

  console.log('✅ Seed completed.');
  await queryRunner.release();
  await dataSource.destroy();
}

seed().catch(console.error);
