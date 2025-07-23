import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlotsService {
  constructor(@InjectRepository(Slot) private slotRepo: Repository<Slot>) {}

  findDoctorSlots(doctorId: string) {
    return this.slotRepo.find({ where: { doctor: { id: doctorId } }, relations: ['doctor'] });
  }

  createSlot(doctorId: string, dto: Partial<Slot>) {
    const slot = this.slotRepo.create({ ...dto, doctor: { id: doctorId } });
    return this.slotRepo.save(slot);
  }

  async deleteSlot(id: string) {
    await this.slotRepo.delete(id);
    return { deleted: true };
  }
}
