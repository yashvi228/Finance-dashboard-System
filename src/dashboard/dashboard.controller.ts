import { Controller, Get, Request, UseGuards, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) { }

  @Get('summary')
  @Roles('analyst', 'admin')
  getSummary(@Request() req) {
    return this.dashboardService.getSummary(req.user.userId, req.user.role);
  }

  @Get('category-totals')
  @Roles('analyst', 'admin')
  getCategoryTotals(@Request() req) {
    return this.dashboardService.getCategoryTotals(req.user.userId, req.user.role);
  }

  @Get('trends')
  @Roles('analyst', 'admin')
  getTrends(@Request() req, @Query('months') months?: string) {
    return this.dashboardService.getMonthlyTrends(req.user.userId, req.user.role, months ? parseInt(months) : 6);
  }

  @Get('recent')
  @Roles('analyst', 'admin')
  getRecentTransactions(@Request() req, @Query('limit') limit?: string) {
    return this.dashboardService.getRecentTransactions(req.user.userId, req.user.role, limit ? parseInt(limit) : 5);
  }
}