import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('api/patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.get(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  update(@Param('id') id: string, @Body() dto: any, @Request() req) {
    // Optionally, verify req.user matches patient id
    return this.patientsService.update(id, dto);
  }
}
