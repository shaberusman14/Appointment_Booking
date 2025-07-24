// File: src/migrations/1700000000000-ElasticSchedulingMigration.ts

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ElasticSchedulingMigration1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "slots_mode_enum" ADD VALUE 'elastic'`);

    await queryRunner.query(`
      ALTER TABLE "slots"
      ADD COLUMN IF NOT EXISTS "slotDuration" INTEGER,
      ADD COLUMN IF NOT EXISTS "originalStartTime" VARCHAR,
      ADD COLUMN IF NOT EXISTS "originalEndTime" VARCHAR
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "slot_adjustment_log" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "slotId" uuid NOT NULL,
        "doctorId" uuid NOT NULL,
        "action" VARCHAR NOT NULL,
        "changeDetails" JSONB,
        "timestamp" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "slot_adjustment_log"`);

    await queryRunner.query(`
      ALTER TABLE "slots" DROP COLUMN IF EXISTS "slotDuration",
      DROP COLUMN IF EXISTS "originalStartTime",
      DROP COLUMN IF EXISTS "originalEndTime"
    `);
  }
}
