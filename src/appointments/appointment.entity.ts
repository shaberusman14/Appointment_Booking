import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Slot } from '../slots/slot.entity';

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
  IMPACTED = 'impacted',
    ARRIVED = 'arrived',    // newly added
  LATE = 'late',          
  NO_SHOW = 'no-show',
}

@Entity('appointments')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Slot, (slot) => slot.appointments)
  slot: Slot;

  @Column()
  reason: string;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  reportingTime?: string; // NEW: Reporting/arrival time, e.g. '09:45' for a 10:00 slot
  
  @Column({ type: 'timestamp', nullable: true })
arrivalTime?: Date;
}

