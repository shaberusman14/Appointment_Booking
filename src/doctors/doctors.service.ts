import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private doctorRepo: Repository<Doctor>) {}

  findAll() {
    return this.doctorRepo.find();
  }

  findById(id: string) {
    return this.doctorRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: Partial<Doctor>) {
    await this.doctorRepo.update(id, dto);
    return this.findById(id);
  }
}
