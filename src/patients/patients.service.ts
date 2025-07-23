import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private patientRepo: Repository<Patient>) {}

  get(id: string) {
    return this.patientRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: Partial<Patient>) {
    await this.patientRepo.update(id, dto);
    return this.get(id);
  }
}
