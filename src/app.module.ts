import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentsModule } from './appointments/appointments.module';

import { User } from './users/user.entity';
import { Doctor } from './doctors/doctor.entity';
import { Patient } from './patients/patient.entity';
import { Slot } from './slots/slot.entity';
import { Appointment } from './appointments/appointment.entity';
import { AnalyticsModule } from './analytics/analytics.module';
import { SlotAdjustmentLog } from './slots/slot-adjustment-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
      entities: [User, Doctor, Patient, Slot, Appointment,SlotAdjustmentLog],
      logging: true,
    }),

    AuthModule,
    UsersModule,
    DoctorsModule,
    PatientsModule,
    SlotsModule,
    AppointmentsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
