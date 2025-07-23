import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Slot } from '../slots/slot.entity';
import { Patient } from '../patients/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment, // for AppointmentRepository
      Slot,        // for SlotRepository
      Patient      // for PatientRepository
    ])
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
