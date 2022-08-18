import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveCategoryIdFromRentals1660857889183
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rentals', 'category_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('rentals', new TableColumn());
  }
}
