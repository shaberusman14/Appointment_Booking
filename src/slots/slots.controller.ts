import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
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
}
