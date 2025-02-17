import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739824374020 implements MigrationInterface {
    name = 'Migrations1739824374020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`date_of_joining\` varchar(255) NOT NULL, \`last_salary\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`employee\``);
    }

}
