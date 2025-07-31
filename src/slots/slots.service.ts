import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../appointments/appointment.entity';
import { SlotAdjustmentAction, SlotAdjustmentLog } from './slot-adjustment-log.entity';
import { BadRequestException } from '@nestjs/common';
import { SlotMode } from './slot.entity';


@Injectable()
export class SlotsService {
   constructor(
    @InjectRepository(Slot)
    private slotRepo: Repository<Slot>,

    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(SlotAdjustmentLog)
    private adjustmentLogRepo: Repository<SlotAdjustmentLog>,
  ) {}

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

  async updateTimeWindow(
    doctorId: string,
    slotId: string,
    dto: { newStartTime: string; newEndTime: string; strategy?: 'preserve' | 'shift' },
  ) {
    const slot = await this.slotRepo.findOne({ where: { id: slotId, doctor: { id: doctorId } }, relations: ['appointments'] });
    if (!slot) throw new BadRequestException('Slot not found or unauthorized');
    if (slot.mode !== SlotMode.ELASTIC) throw new BadRequestException('Slot is not elastic');

    if (!slot.originalStartTime) slot.originalStartTime = slot.startTime;
    if (!slot.originalEndTime) slot.originalEndTime = slot.endTime;

    slot.startTime = dto.newStartTime;
    slot.endTime = dto.newEndTime;

    await this.slotRepo.save(slot);

    for (const appt of slot.appointments) {
      appt.status = AppointmentStatus.IMPACTED;
      await this.appointmentRepo.save(appt);
    }

    await this.adjustmentLogRepo.save(
      this.adjustmentLogRepo.create({
        slotId,
        doctorId,
        action: SlotAdjustmentAction.UPDATE_TIME_WINDOW,
        changeDetails: dto,
      }),
    );

    return slot;
  }

  async updateSlotDuration(
    doctorId: string,
    slotId: string,
    dto: { slotDuration: number },
  ) {
    const slot = await this.slotRepo.findOne({ where: { id: slotId, doctor: { id: doctorId } } });
    if (!slot) throw new BadRequestException('Slot not found or unauthorized');
    if (slot.mode !== SlotMode.ELASTIC) throw new BadRequestException('Slot is not elastic');

    slot.slotDuration = dto.slotDuration;
    await this.slotRepo.save(slot);

    await this.adjustmentLogRepo.save(
      this.adjustmentLogRepo.create({
        slotId,
        doctorId,
        action: SlotAdjustmentAction.UPDATE_SLOT_DURATION,
        changeDetails: dto,
      }),
    );

    return slot;
  }

  async getAffectedAppointments(slotId: string) {
    return this.appointmentRepo.find({
      where: { slot: { id: slotId }, status: AppointmentStatus.IMPACTED },
      relations: ['patient', 'slot'],
    });
  }



}

