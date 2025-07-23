import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Patient } from '../patients/patient.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['doctor', 'patient'] })
  role: 'doctor' | 'patient';

  @OneToOne(() => Doctor, (doctor) => doctor.user, { cascade: true, nullable: true })
  doctorProfile: Doctor;

  @OneToOne(() => Patient, (patient) => patient.user, { cascade: true, nullable: true })
  patientProfile: Patient;
}
