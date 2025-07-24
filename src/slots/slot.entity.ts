import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Appointment } from '../appointments/appointment.entity';

export enum SlotMode {
  STREAM = 'stream',
  WAVE = 'wave',
  ELASTIC = 'elastic',
}

@Entity('slots')
export class Slot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ type: 'enum', enum: SlotMode, default: SlotMode.STREAM })
  mode: SlotMode;

  @Column({ nullable: true })
  maxBookings: number;

  @Column({ nullable: true, type: 'integer' })
  slotDuration?: number;

  @Column({ nullable: true })
  originalStartTime?: string;

  @Column({ nullable: true })
  originalEndTime?: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.slots)
  doctor: Doctor;

  @OneToMany(() => Appointment, (appt) => appt.slot)
  appointments: Appointment[];
}
