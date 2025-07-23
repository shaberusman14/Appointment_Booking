import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Appointment } from '../appointments/appointment.entity';

@Entity('slots')
export class Slot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string; // Format: YYYY-MM-DD

  @Column()
  startTime: string; // Format: HH:MM

  @Column()
  endTime: string; // Format: HH:MM

  @Column({ type: 'enum', enum: ['wave', 'stream'] })
  mode: 'wave' | 'stream';

  @Column({ nullable: true })
  maxBookings: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.slots)
  doctor: Doctor;

  @OneToMany(() => Appointment, (appt) => appt.slot)
  appointments: Appointment[];
}
