import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('slots/:slotId/report')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  async getSlotReport(@Param('slotId') slotId: string, @Req() req) {
    console.log('User making request:', req.user); // Debug check

    const adjustments = await this.analyticsService.getElasticSlotAdjustmentCount(slotId);
    const impactedAppointments = await this.analyticsService.getImpactedAppointmentsCount(slotId);
    const bulkReschedules = await this.analyticsService.getBulkRescheduleCount(slotId);

    return {
      adjustments,
      impactedAppointments,
      bulkReschedules,
    };
  }

  @Get('doctors/:doctorId/average-slot-duration')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor') 
  async getAverageSlotDuration(@Param('doctorId') doctorId: string) {
    const avgDuration = await this.analyticsService.getAverageSlotDuration(doctorId);
    return { averageSlotDurationMinutes: avgDuration };
  }
}
