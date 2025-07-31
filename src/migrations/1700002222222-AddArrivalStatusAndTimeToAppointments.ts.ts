import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArrivalStatusAndTimeToAppointments1700002222222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add 'arrivalTime' column if it doesn't exist
    await queryRunner.query(`
      ALTER TABLE "appointments"
      ADD COLUMN IF NOT EXISTS "arrivalTime" TIMESTAMP NULL;
    `);

    // Conditionally drop the enum type if it exists
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointments_status_enum') THEN
          -- Drop dependent constraints first if needed (not included here, add if you have any)
          DROP TYPE appointments_status_enum;
        END IF;
      END$$;
    `);

    // Create the enum type with the new status values
    await queryRunner.query(`
      CREATE TYPE appointments_status_enum AS ENUM (
        'scheduled',
        'cancelled',
        'rescheduled',
        'impacted',
        'arrived',
        'late',
        'no-show'
      );
    `);

    // Alter the 'status' column to use the new enum with casting
    await queryRunner.query(`
      ALTER TABLE "appointments"
      ALTER COLUMN "status" TYPE appointments_status_enum
      USING "status"::text::appointments_status_enum;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove arrivalTime column
    await queryRunner.query(`
      ALTER TABLE "appointments"
      DROP COLUMN IF EXISTS "arrivalTime";
    `);

    // Drop the enum type
    await queryRunner.query(`
      DROP TYPE IF EXISTS appointments_status_enum;
    `);
  }
}
