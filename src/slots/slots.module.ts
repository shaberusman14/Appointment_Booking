import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { Appointment } from '../appointments/appointment.entity';
import { SlotAdjustmentLog } from './slot-adjustment-log.entity';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Slot,
      Appointment,       // Add this
      SlotAdjustmentLog, // Add this
    ]),
  ],
  providers: [SlotsService],
  controllers: [SlotsController],
  exports: [SlotsService],
})
export class SlotsModule {}
