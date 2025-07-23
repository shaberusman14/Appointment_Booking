import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1700000000000 implements MigrationInterface {
  name = 'Init1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('doctor', 'patient')`);
    await queryRunner.query(`CREATE TABLE "users" (
      "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      "email" VARCHAR NOT NULL UNIQUE,
      "password" VARCHAR NOT NULL,
      "role" "users_role_enum" NOT NULL
    )`);

    await queryRunner.query(`CREATE TABLE "doctors" (
      "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "fullName" VARCHAR,
      "specialization" VARCHAR,
      "bio" TEXT,
      "userId" UUID UNIQUE,
      CONSTRAINT "FK_doctor_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE TABLE "patients" (
      "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "name" VARCHAR,
      "dateOfBirth" DATE,
      "userId" UUID UNIQUE,
      CONSTRAINT "FK_patient_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE TYPE "slots_mode_enum" AS ENUM('stream', 'wave')`);
    await queryRunner.query(`CREATE TABLE "slots" (
      "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "date" DATE NOT NULL,
      "startTime" TIME NOT NULL,
      "endTime" TIME NOT NULL,
      "mode" "slots_mode_enum" NOT NULL,
      "maxBookings" INTEGER,
      "doctorId" UUID,
      CONSTRAINT "FK_slot_doctor" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE TABLE "appointments" (
      "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "reason" TEXT,
      "status" VARCHAR DEFAULT 'scheduled',
      "createdAt" TIMESTAMPTZ DEFAULT now(),
      "patientId" UUID,
      "slotId" UUID,
      CONSTRAINT "FK_appt_patient" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE,
      CONSTRAINT "FK_appt_slot" FOREIGN KEY ("slotId") REFERENCES "slots"("id") ON DELETE CASCADE
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appointments"`);
    await queryRunner.query(`DROP TABLE "slots"`);
    await queryRunner.query(`DROP TYPE "slots_mode_enum"`);
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(`DROP TABLE "doctors"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "users_role_enum"`);
  }
}
