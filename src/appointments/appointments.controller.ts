import { Controller, Post, Patch, Delete, Param, Body, Get, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  book(@Body() dto: { patientId: string; slotId: string; reason: string }) {
    return this.appointmentsService.book(dto);
  }

  @Patch(':id/reschedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  reschedule(@Param('id') id: string, @Body() dto: { newSlotId: string }) {
    return this.appointmentsService.reschedule(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }

  @Get('/patient/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  getPatientAppointments(@Param('id') id: string) {
    return this.appointmentsService.getByPatient(id);
  }

  @Get('/doctor/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  getDoctorAppointments(@Param('id') id: string) {
    return this.appointmentsService.getByDoctor(id);
  }
}
