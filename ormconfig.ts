import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from './src/users/user.entity';
import { Doctor } from './src/doctors/doctor.entity';
import { Patient } from './src/patients/patient.entity';
import { Slot } from './src/slots/slot.entity';
import { Appointment } from './src/appointments/appointment.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Doctor, Patient, Slot, Appointment],
  migrations: ['src/migrations/*.ts'], // ✅ VS dist/*.js
  synchronize: false,
  logging: true,
});

export default AppDataSource;
