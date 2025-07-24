import { Controller, Get, Post, Delete, Param, Body,Patch, UseGuards } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('api/doctors/:doctorId/slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  findAll(@Param('doctorId') doctorId: string) {
    return this.slotsService.findDoctorSlots(doctorId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  create(@Param('doctorId') doctorId: string, @Body() dto: any) {
    return this.slotsService.createSlot(doctorId, dto);
  }

  @Delete(':slotId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  delete(@Param('slotId') slotId: string) {
    return this.slotsService.deleteSlot(slotId);
  }

//es
    @Patch(':slotId/update-time-window')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  updateTimeWindow(
    @Param('doctorId') doctorId: string,
    @Param('slotId') slotId: string,
    @Body() dto: { newStartTime: string; newEndTime: string; strategy?: 'preserve' | 'shift' },
  ) {
    return this.slotsService.updateTimeWindow(doctorId, slotId, dto);
  }

  @Patch(':slotId/update-slot-duration')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  updateSlotDuration(
    @Param('doctorId') doctorId: string,
    @Param('slotId') slotId: string,
    @Body() dto: { slotDuration: number },
  ) {
    return this.slotsService.updateSlotDuration(doctorId, slotId, dto);
  }

  @Get(':slotId/affected-appointments')
  @UseGuards(JwtAuthGuard)
  getAffectedAppointments(@Param('slotId') slotId: string) {
    return this.slotsService.getAffectedAppointments(slotId);
  }
}
