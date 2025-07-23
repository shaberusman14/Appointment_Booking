import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { Doctor } from '../doctors/doctor.entity';
import { Patient } from '../patients/patient.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async createUser(dto: RegisterDto, role: 'doctor' | 'patient') {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hash, role });

    if (role === 'doctor') {
      const doctor = this.doctorRepo.create();
      user.doctorProfile = doctor;
    } else {
      const patient = this.patientRepo.create();
      user.patientProfile = patient;
    }

    return this.userRepo.save(user);
  }

  async validateUser(email: string, pwd: string) {
    const user = await this.userRepo.findOne({ where: { email }, relations: ['doctorProfile', 'patientProfile'] });
    if (!user) return null;

    const passMatch = await bcrypt.compare(pwd, user.password);
    return passMatch ? user : null;
  }
}
