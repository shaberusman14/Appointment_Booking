import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot, SlotMode } from '../slots/slot.entity';
import { Appointment, AppointmentStatus } from '../appointments/appointment.entity';
import { SlotAdjustmentLog, SlotAdjustmentAction } from '../slots/slot-adjustment-log.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepo: Repository<Slot>,

    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,

    @InjectRepository(SlotAdjustmentLog)
    private readonly adjustmentLogRepo: Repository<SlotAdjustmentLog>,
  ) {}

  async getElasticSlotAdjustmentCount(slotId: string): Promise<number> {
    return this.adjustmentLogRepo.count({
      where: { slotId, action: SlotAdjustmentAction.UPDATE_TIME_WINDOW },
    });
  }

  async getImpactedAppointmentsCount(slotId: string): Promise<number> {
    return this.appointmentRepo.count({
      where: { slot: { id: slotId }, status: AppointmentStatus.IMPACTED },
    });
  }

  async getBulkRescheduleCount(slotId: string): Promise<number> {
    return this.adjustmentLogRepo.count({
      where: { slotId, action: SlotAdjustmentAction.BULK_RESCHEDULE },
    });
  }

  async getAverageSlotDuration(doctorId: string): Promise<number> {
    const result = await this.slotRepo
      .createQueryBuilder('slot')
      .select('AVG(slot.slotDuration)', 'avgDuration')
      .where('slot.doctorId = :doctorId', { doctorId })
      .andWhere('slot.mode = :mode', { mode: SlotMode.ELASTIC })
      .getRawOne();

    return parseFloat(result.avgDuration) || 0;
  }
}
