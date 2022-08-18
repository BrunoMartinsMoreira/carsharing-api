import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnActiveToRentals1660861389805
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rentals',
      new TableColumn({
        name: 'active',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rentals', 'active');
  }
}
