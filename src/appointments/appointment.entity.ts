import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Slot } from '../slots/slot.entity';

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

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'cancelled' | 'rescheduled';

  @CreateDateColumn()
  createdAt: Date;
}
