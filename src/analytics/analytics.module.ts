import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Slot } from '../slots/slot.entity';
import { Appointment } from '../appointments/appointment.entity';
import { SlotAdjustmentLog } from '../slots/slot-adjustment-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Appointment, SlotAdjustmentLog])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
